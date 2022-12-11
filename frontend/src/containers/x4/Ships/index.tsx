import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import { seo } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import LayoutClient from '../../../layouts/Client';
import { X4ShipClassEnum, X4ShipInterface, getX4Equipment, getX4Ships } from '../../../redux/x4/fitting';
import { applyEngineToTheShip, applyShieldToTheShip, applyThrusterToTheShip } from '../ship-fitting-tool';
import { sortShips } from '../ship-sorter';
import { formatDecimal, formatNumber, getFaction, maps, separateWords } from '../x4-helpers';
import PreviewControls from './PreviewControls';
import './Ships.scss';
import {
  ActiveEquipment,
  getHighestAvailableEngineId,
  getHighestAvailableShieldId,
  getHighestAvailableThrusterId,
  initialActiveEquipment,
  initialStateDisplayClass,
  initialStateDisplayRaces,
  initialStateDisplayVariations,
} from './x4-ship-helpers';

const LabelValuePair = ({
  label,
  value,
  unit,
  info,
  capitalize,
  indent = false,
}: {
  label: string;
  value: string | number;
  unit?: string;
  info?: string;
  capitalize?: boolean;
  indent?: boolean;
}) => (
  <p className="text--smaller no-mb x4-ships__label-value-pair">
    <span className={clsx({ 'text--capitalize': capitalize })}>
      {indent && <span>&raquo;</span>}
      {info && (
        <span className="x4-ships__info" title={info}>
          ?
        </span>
      )}
      {label}:{' '}
    </span>
    <span className={clsx({ 'text--capitalize': capitalize })}>{value}</span> {unit}
  </p>
);

const X4Ships = () => {
  const dispatch = useAppDispatch();
  const { ships, equipment } = useAppSelector((state) => state.x4Fitting);

  const [shipsToDisplay, setShipsToDisplay] = useState<X4ShipInterface[]>([]);
  const [displayClass, setDisplayClass] = useState<{ [key in X4ShipClassEnum]: boolean }>(initialStateDisplayClass);
  const [displayRace, setDisplayRace] = useState<{ [key: string]: boolean }>(initialStateDisplayRaces);
  const [displayTypes, setDisplayTypes] = useState<{ [key: string]: boolean }>({});
  const [displayVariations, setDisplayVariations] = useState<{ [key: string]: boolean }>(initialStateDisplayVariations);
  const [activeEquipment, setActiveEquipment] = useState<ActiveEquipment>(initialActiveEquipment);
  const [sort, setSort] = useState('class');

  useEffect(() => {
    if (ships && equipment) {
      let filteredShips: X4ShipInterface[] = [];

      // filter out ships
      Object.values(ships).forEach((ship) => {
        if (!displayClass[ship.class]) return;
        if (!displayRace[ship.race]) return;
        if (!displayTypes[ship.type]) return;
        if (!displayVariations[ship.shortvariation]) return;

        const modifiedShip = { ...ship };
        const thrusterId = getHighestAvailableThrusterId(modifiedShip, activeEquipment);
        const engineId = getHighestAvailableEngineId(modifiedShip, activeEquipment);
        const shieldId = getHighestAvailableShieldId(modifiedShip, activeEquipment, equipment);

        applyEngineToTheShip(modifiedShip, equipment, engineId);
        applyThrusterToTheShip(modifiedShip, equipment, thrusterId);
        applyShieldToTheShip(modifiedShip, equipment, shieldId);

        modifiedShip.outfit = {
          engines: engineId,
          thrusters: thrusterId,
          shields: shieldId,
        };

        filteredShips.push(modifiedShip);
      });

      setShipsToDisplay(sortShips(filteredShips, sort));
    }
  }, [ships, equipment, displayClass, displayRace, displayTypes, displayVariations, sort, activeEquipment]);

  useEffect(() => {
    if (ships && Object.keys(displayTypes).length === 0) {
      const nextDisplayTypes: { [key: string]: boolean } = {};
      Object.values(ships).forEach((ship) => {
        nextDisplayTypes[ship.type] = true;
      });
      setDisplayTypes(nextDisplayTypes);
    }
  }, [ships, displayTypes]);

  useEffect(() => {
    if (!ships) dispatch(getX4Ships()).then(() => dispatch(getX4Equipment()));

    if (ships) {
      const shipNames = Object.values(ships).map((ship) => ship.name.replace('Vanguard', '').replace('Sentinel', ''));

      seo({
        title: 'X4 Ships',
        metaDescription: 'X4 Foundations, Split Vendetta and Cradle of Humanity ships previewer.',
        // @ts-ignore
        keywords: [...new Set(shipNames)],
      });
    }
  }, [dispatch, ships]);

  return (
    <LayoutClient>
      <div className={clsx('x4-ships')}>
        <h1>X4 Ships</h1>

        <PreviewControls
          displayClass={displayClass}
          setDisplayClass={setDisplayClass}
          displayVariations={displayVariations}
          setDisplayVariations={setDisplayVariations}
          displayRace={displayRace}
          setDisplayRace={setDisplayRace}
          sort={sort}
          setSort={setSort}
          displayTypes={displayTypes}
          setDisplayTypes={setDisplayTypes}
          activeEquipment={activeEquipment}
          setActiveEquipment={setActiveEquipment}
        />

        <div className="x4-ships__wrapper">
          {shipsToDisplay &&
            shipsToDisplay.map((ship) => (
              <div className="x4-ships__ship" key={ship.id}>
                <div className="x4-ships__header">
                  <div className="x4-ships__ship-image">
                    <img src={`/images/x4/${ship.id}.jpg`} alt={ship.name} />
                  </div>
                  <div className="text x4-ships__name">
                    <h2 className="h6">{ship.name}</h2>
                    <p className="text--small text--capitalize">
                      {getFaction(ship.manufacturer)} {separateWords(ship.type)}
                    </p>
                    <p className="text--smaller no-mb text--capitalize">
                      Average: {formatNumber(ship.price.average)} CR
                    </p>
                    <p className="text--smaller no-mb text--capitalize">
                      Ship class: {separateWords(maps.shipClass[ship.class].replace('extralarge', 'XL'))}
                    </p>
                  </div>
                </div>
                <div className="x4-ships__details">
                  <div className="x4-ships__values">
                    <LabelValuePair label="Mass" value={formatNumber(ship.mass)} unit="t" />
                    <LabelValuePair label="Hull" value={formatNumber(ship.hull)} unit="MJ" />
                    <LabelValuePair label="Shield" value={formatNumber(ship.shield.max)} unit="MJ" />
                    <LabelValuePair label="Recharge" value={formatNumber(ship.shield.rate)} unit="MJ/s" indent />
                    {ship.class === 'ship_s' && (
                      <LabelValuePair label="Delay" value={formatNumber(ship.shield.delay)} unit="s" indent />
                    )}
                  </div>
                  <div className="x4-ships__values">
                    <LabelValuePair label="Speed" value={formatDecimal(ship.speed.forward)} unit="m/s" />
                    <LabelValuePair label="Pitch" value={formatDecimal(ship.speed.pitch)} unit="°/s" />
                    <LabelValuePair label="Roll" value={formatDecimal(ship.speed.roll)} unit="°/s" />
                    <LabelValuePair label="Yaw" value={formatDecimal(ship.speed.yaw)} unit="°/s" />
                    <LabelValuePair label="Acceleration" value={formatDecimal(ship.speed.acceleration)} unit="m/s²" />
                  </div>

                  <div className="x4-ships__values">
                    <LabelValuePair label="Boost speed" value={formatNumber(ship.speed.boost.speed)} unit="m/s" />
                    <LabelValuePair
                      label="Attack"
                      value={formatDecimal(ship.speed.boost.attack)}
                      unit="s"
                      info="Time to reach full speed"
                      indent
                    />
                    <LabelValuePair
                      label="Duration"
                      value={formatDecimal(ship.speed.boost.duration)}
                      unit="s"
                      info="Time until shields are depleted"
                      indent
                    />
                    <LabelValuePair
                      label="Release"
                      value={formatDecimal(ship.speed.boost.release)}
                      unit="s"
                      info="Time to slow down to normal speed"
                      indent
                    />
                  </div>

                  <div className="x4-ships__values">
                    <LabelValuePair label="Travel speed" value={formatNumber(ship.speed.travel.speed)} unit="m/s" />
                    <LabelValuePair
                      label="Attack"
                      value={formatDecimal(ship.speed.travel.attack)}
                      unit="s"
                      info="Time to reach full speed"
                      indent
                    />
                    <LabelValuePair
                      label="Charge"
                      value={formatDecimal(ship.speed.travel.charge)}
                      unit="s"
                      info="Time needed to activate travel drive"
                      indent
                    />
                    <LabelValuePair
                      label="Release"
                      value={formatDecimal(ship.speed.travel.release)}
                      unit="s"
                      info="Time to slow down to normal speed"
                      indent
                    />
                    <LabelValuePair
                      label="To reach"
                      value={formatDecimal(
                        ((1 / 2) *
                          (ship.speed.travel.speed / ship.speed.travel.attack) *
                          Math.pow(ship.speed.travel.attack, 2)) /
                          1000
                      )}
                      unit="km"
                      info="Distance that ship needs in order to reach it's maximum speed"
                      indent
                    />
                    <LabelValuePair
                      label="To stop"
                      value={formatDecimal(
                        ((1 / 2) *
                          (ship.speed.travel.speed / ship.speed.travel.release) *
                          Math.pow(ship.speed.travel.release, 2)) /
                          1000
                      )}
                      unit="km"
                      info="Distance that ship needs in order to slow down to normal speed"
                      indent
                    />
                  </div>

                  <div className="x4-ships__values">
                    {ship.shipstorage.dock_m !== 0 && (
                      <LabelValuePair label="Medium dock" value={formatNumber(ship.shipstorage.dock_m)} unit="" />
                    )}
                    {ship.shipstorage.dock_s !== 0 && (
                      <LabelValuePair label="Small dock" value={formatNumber(ship.shipstorage.dock_s)} unit="" />
                    )}
                    <LabelValuePair label="Drones" value={formatNumber(ship.storage.unit)} unit="" />
                    <LabelValuePair label="Missiles" value={formatNumber(ship.storage.missile)} unit="" />
                    <LabelValuePair label="Countermeasures" value={formatNumber(ship.storage.countermeasure)} unit="" />
                  </div>

                  <div className="x4-ships__values">
                    <LabelValuePair label="Crew" value={formatNumber(ship.storage.people)} unit="" capitalize />
                    <LabelValuePair label="Items" value={formatNumber(ship.storage.deployable)} unit="" capitalize />
                    {ship.storage.capacityType && (
                      <LabelValuePair
                        label="Storage"
                        value={ship.storage.capacityType
                          .replace('container solid liquid', 'any')
                          .replace('container condensate', 'container')}
                        unit=""
                        capitalize
                      />
                    )}
                    <LabelValuePair
                      label="Capacity"
                      value={formatNumber(ship.storage.capacity)}
                      unit="m³"
                      capitalize
                      indent
                    />
                  </div>

                  <div className="x4-ships__values">
                    {Object.keys(ship.armaments.weapons).map(
                      (weaponsKey) =>
                        ship.armaments.weapons[weaponsKey as keyof typeof ship.armaments.weapons] !== 0 && (
                          <LabelValuePair
                            label={`${weaponsKey.replace('extralarge', 'XL')} weapons`}
                            value={formatNumber(
                              ship.armaments.weapons[weaponsKey as keyof typeof ship.armaments.weapons]
                            )}
                            unit=""
                            capitalize
                            key={`${ship.id}-${weaponsKey}-weapon`}
                          />
                        )
                    )}
                    {Object.keys(ship.armaments.turrets).map(
                      (turretsKey) =>
                        ship.armaments.turrets[turretsKey as keyof typeof ship.armaments.turrets] !== 0 && (
                          <LabelValuePair
                            label={`${turretsKey.replace('extralarge', 'XL')} turrets`}
                            value={formatNumber(
                              ship.armaments.turrets[turretsKey as keyof typeof ship.armaments.turrets]
                            )}
                            unit=""
                            capitalize
                            key={`${ship.id}-${turretsKey}-turret`}
                          />
                        )
                    )}
                  </div>
                </div>
                <div className="x4-ships__outfit">
                  Currently equipped: {equipment[ship.outfit!.thrusters].name}, {equipment[ship.outfit!.engines].name},{' '}
                  {equipment[ship.outfit!.shields].name}
                </div>
              </div>
            ))}
        </div>
      </div>
    </LayoutClient>
  );
};

export default X4Ships;
