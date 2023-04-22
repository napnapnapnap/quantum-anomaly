import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import { seo } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import LayoutBase from '../../../layouts/Base';
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
  initialStateDisplayDlcs,
  initialStateDisplayRaces,
  initialStateDisplayVariations,
} from './x4-ship-helpers';

const X4Ships = () => {
  const dispatch = useAppDispatch();
  const { ships, equipment } = useAppSelector((state) => state.x4Fitting);

  const [shipsToDisplay, setShipsToDisplay] = useState<X4ShipInterface[]>([]);
  const [displayClass, setDisplayClass] = useState<{ [key in X4ShipClassEnum]: boolean }>(initialStateDisplayClass);
  const [displayRace, setDisplayRace] = useState<{ [key: string]: boolean }>(initialStateDisplayRaces);
  const [displayTypes, setDisplayTypes] = useState<{ [key: string]: boolean }>({});
  const [displayDlcs, setDisplayDlcs] = useState<{ [key: string]: boolean }>(initialStateDisplayDlcs);
  const [displayVariations, setDisplayVariations] = useState<{ [key: string]: boolean }>(initialStateDisplayVariations);
  const [activeEquipment, setActiveEquipment] = useState<ActiveEquipment>(initialActiveEquipment);
  const [sort, setSort] = useState('class');
  const [native, setNative] = useState(false);
  const [alwaysKeep, setAlwaysKeep] = useState<string[]>([]);

  useEffect(() => {
    if (ships && equipment) {
      let filteredShips: X4ShipInterface[] = [];

      // filter out ships
      Object.values(ships).forEach((ship) => {
        if (!displayClass[ship.class] && !alwaysKeep.includes(ship.id)) return;
        if (!displayRace[ship.race] && !alwaysKeep.includes(ship.id)) return;
        if (!displayTypes[ship.type] && !alwaysKeep.includes(ship.id)) return;
        if (!displayVariations[ship.shortvariation] && !alwaysKeep.includes(ship.id)) return;
        if (!displayDlcs[ship.dlc] && !alwaysKeep.includes(ship.id)) return;

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
  }, [
    ships,
    equipment,
    displayClass,
    displayRace,
    displayTypes,
    displayVariations,
    sort,
    activeEquipment,
    displayDlcs,
    native,
    alwaysKeep,
  ]);

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
    <LayoutBase>
      <div className={clsx('x4-ships')}>
        <h1>X4 Ships</h1>
        <Tooltip id="ship-description" events={['hover']} />
        <Tooltip id="ship-values" events={['hover']} />

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
          displayDlcs={displayDlcs}
          setDisplayDlcs={setDisplayDlcs}
        />

        <p className="text--xs text--muted text--long x4-ships__notice">
          If selected is not available for a given ship, it will use the next best thing. For example, Mk.4 engines are
          only available to Split in small and medium size. Selecting these engines will equip split Mk.1 versions on
          large ships. Combat engines do not exist on capitals, they will be translated into all-round engines. Under
          each ship there is a list of actually equipped modules.
        </p>

        <div className="x4-ships__wrapper">
          <p className="text--xs text--muted">Displayed {shipsToDisplay.length} ships</p>
          <table className="x4-ships__table">
            <tbody>
              {shipsToDisplay &&
                shipsToDisplay.map((ship) => (
                  <tr key={ship.id}>
                    <td>
                      <img
                        src={`/images/x4/large/${ship.id}.jpg`}
                        alt={ship.name}
                        data-tooltip-id="ship-description"
                        data-tooltip-html={ship.description ? ship.description.replace(/\\n/g, '<br />') : ''}
                      />
                      <div className="x4-ships__quick-controls"></div>
                    </td>
                    <td>
                      <h2 className="h6">{ship.name}</h2>
                      <p className="x4-ships__value text--capitalize">
                        {separateWords(maps.shipClass[ship.class].replace('extralarge', 'XL'))}{' '}
                        {separateWords(ship.type)}
                      </p>
                      <p className="x4-ships__value text--capitalize">{getFaction(ship.manufacturer)}</p>
                      <p className="x4-ships__value">Average price: {formatNumber(ship.price.average)} CR</p>

                      <p className="x4-ships__value text--capitalize mt-1">
                        <span>{equipment[ship.outfit!.thrusters].name}</span>
                      </p>

                      <p className="x4-ships__value text--capitalize">
                        <span>
                          {formatNumber(ship.shields.quantity)}&#215; {equipment[ship.outfit!.shields].name}
                        </span>
                      </p>

                      <p className="x4-ships__value text--capitalize mb-1">
                        <span>
                          {formatNumber(ship.engines.quantity)}&#215; {equipment[ship.outfit!.engines].name}
                        </span>
                      </p>

                      {Object.keys(ship.armaments.weapons).map(
                        (weaponsKey, index) =>
                          ship.armaments.weapons[weaponsKey as keyof typeof ship.armaments.weapons] !== 0 && (
                            <p className="x4-ships__value text--capitalize" key={`${ship.id}-${weaponsKey}-weapon`}>
                              <span>{`${weaponsKey.replace('extralarge', 'XL')} weapons`}:</span>
                              <span>
                                {formatNumber(
                                  ship.armaments.weapons[weaponsKey as keyof typeof ship.armaments.weapons]
                                )}
                              </span>
                            </p>
                          )
                      )}
                      {Object.keys(ship.armaments.turrets).map(
                        (turretsKey, index) =>
                          ship.armaments.turrets[turretsKey as keyof typeof ship.armaments.turrets] !== 0 && (
                            <p className="x4-ships__value text--capitalize" key={`${ship.id}-${turretsKey}-weapon`}>
                              <span>{`${turretsKey.replace('extralarge', 'XL')} turrets`}:</span>
                              <span>
                                {formatNumber(
                                  ship.armaments.turrets[turretsKey as keyof typeof ship.armaments.turrets]
                                )}
                              </span>
                            </p>
                          )
                      )}
                    </td>

                    <td>
                      <p className="x4-ships__value">
                        <span>Hull:</span> <span>{formatNumber(ship.hull)} MJ</span>
                      </p>
                      <p className="x4-ships__value">
                        <span>Shield:</span> <span>{formatNumber(ship.shield.max)} MJ</span>
                      </p>
                      <p className="x4-ships__value x4-ships__value--indent">
                        <span>Recharge:</span> <span>{formatNumber(ship.shield.rate)} MJ/s</span>
                      </p>
                      {(ship.class === 'ship_s' || ship.class === 'ship_m') && (
                        <p
                          className="x4-ships__value x4-ships__value--indent"
                          data-tooltip-id="ship-values"
                          data-tooltip-html="Time needed for shields to start recharging after taking damage"
                        >
                          <span>Delay:</span> <span>{formatNumber(ship.shield.delay)} s</span>
                        </p>
                      )}

                      <p className="x4-ships__value mt-1">
                        <span>Speed:</span> <span>{formatDecimal(ship.speed.forward)} m/s</span>
                      </p>
                      <p className="x4-ships__value x4-ships__value--indent">
                        <span>Acceleration:</span> <span>{formatDecimal(ship.speed.acceleration)} m/s²</span>
                      </p>

                      <p className="x4-ships__value mt-1">
                        <span>Pitch:</span> <span>{formatDecimal(ship.speed.pitch)} °/s</span>
                      </p>
                      <p className="x4-ships__value">
                        <span>Roll:</span> <span>{formatDecimal(ship.speed.roll)} °/s</span>
                      </p>
                      <p className="x4-ships__value">
                        <span>Yaw:</span> <span>{formatDecimal(ship.speed.yaw)} °/s</span>
                      </p>
                      <p className="x4-ships__value">
                        <span>Mass:</span> <span>{formatNumber(ship.mass)} Tons</span>
                      </p>
                    </td>
                    <td>
                      <p className="x4-ships__value">
                        <span>Travel speed:</span> <span>{formatNumber(ship.speed.travel.speed)} m/s</span>
                      </p>
                      <p
                        className="x4-ships__value x4-ships__value--indent"
                        data-tooltip-id="ship-values"
                        data-tooltip-html="Time needed to engage travel drive"
                      >
                        <span>Charge:</span> <span>{formatDecimal(ship.speed.travel.charge)} s</span>
                      </p>
                      <p
                        className="x4-ships__value x4-ships__value--indent"
                        data-tooltip-id="ship-values"
                        data-tooltip-html="Distance / time needed to reach full travel speed once the travel drive is engaged"
                      >
                        <span>Attack:</span>
                        <span>
                          {formatNumber(
                            ((1 / 2) *
                              (ship.speed.travel.speed / ship.speed.travel.attack) *
                              Math.pow(ship.speed.travel.attack, 2)) /
                              1000
                          )}{' '}
                          km, {formatDecimal(ship.speed.travel.attack)} s
                        </span>
                      </p>
                      <p
                        className="x4-ships__value x4-ships__value--indent"
                        data-tooltip-id="ship-values"
                        data-tooltip-html="Distance / time needed to decelerate back to normal speed after travel drive is dissenaged"
                      >
                        <span>Release:</span>
                        <span>
                          {formatNumber(
                            ((1 / 2) *
                              (ship.speed.travel.speed / ship.speed.travel.release) *
                              Math.pow(ship.speed.travel.release, 2)) /
                              1000
                          )}{' '}
                          km, {formatDecimal(ship.speed.travel.release)} s
                        </span>
                      </p>

                      <p className="x4-ships__value mt-1">
                        <span>Boost Speed:</span> <span>{formatNumber(ship.speed.boost.speed)} m/s</span>
                      </p>
                      <p
                        className="x4-ships__value x4-ships__value--indent"
                        data-tooltip-id="ship-values"
                        data-tooltip-html="Time until shields are depleted as result of boosting"
                      >
                        <span>Duration:</span>
                        <span>{formatDecimal(ship.speed.boost.duration)} s</span>
                      </p>
                      <p
                        className="x4-ships__value x4-ships__value--indent"
                        data-tooltip-id="ship-values"
                        data-tooltip-html="Distance / time needed to reach full boost speed once the boost is engaged"
                      >
                        <span>Attack:</span>
                        <span>
                          {formatDecimal(
                            ((1 / 2) *
                              (ship.speed.boost.speed / ship.speed.boost.attack) *
                              Math.pow(ship.speed.boost.attack, 2)) /
                              1000
                          )}{' '}
                          km, {formatDecimal(ship.speed.boost.attack)} s
                        </span>
                      </p>
                      <p
                        className="x4-ships__value x4-ships__value--indent"
                        data-tooltip-id="ship-values"
                        data-tooltip-html="Distance / time decelerate back to normal speed once the boost is disengaged"
                      >
                        <span>Release:</span>
                        <span>
                          {formatDecimal(
                            ((1 / 2) *
                              (ship.speed.boost.speed / ship.speed.boost.release) *
                              Math.pow(ship.speed.boost.release, 2)) /
                              1000
                          )}{' '}
                          km, {formatDecimal(ship.speed.boost.release)} s
                        </span>
                      </p>
                    </td>
                    <td>
                      {ship.shipstorage.pads_m !== 0 && (
                        <p className="x4-ships__value">
                          <span>Medium Landing Pads:</span> <span>{formatNumber(ship.shipstorage.pads_m)}</span>
                        </p>
                      )}
                      {ship.shipstorage.pads_m !== 0 && (
                        <p className="x4-ships__value x4-ships__value--indent mb-1">
                          <span>Storage:</span> <span>{formatNumber(ship.shipstorage.dock_m)}</span>
                        </p>
                      )}

                      {ship.shipstorage.pads_s !== 0 && (
                        <p className="x4-ships__value">
                          <span>Small Landing Pads:</span> <span>{formatNumber(ship.shipstorage.pads_s)}</span>
                        </p>
                      )}
                      {ship.shipstorage.pads_s !== 0 && (
                        <p className="x4-ships__value x4-ships__value--indent mb-1">
                          <span>Storage:</span> <span>{formatNumber(ship.shipstorage.dock_s)}</span>
                        </p>
                      )}

                      <p className="x4-ships__value">
                        <span>Drones:</span> <span>{formatNumber(ship.storage.unit)}</span>
                      </p>
                      <p className="x4-ships__value">
                        <span>Missiles:</span> <span>{formatNumber(ship.storage.missile)}</span>
                      </p>
                      <p className="x4-ships__value">
                        <span>Countermeasures:</span> <span>{formatNumber(ship.storage.countermeasure)}</span>
                      </p>

                      <p className="x4-ships__value mt-1">
                        <span>Crew:</span> <span>{formatNumber(ship.storage.people)}</span>
                      </p>
                      <p className="x4-ships__value mb-1">
                        <span>Deployable Items:</span> <span>{formatNumber(ship.storage.deployable)}</span>
                      </p>
                      {ship.storage.capacityType ? (
                        <p className="x4-ships__value text--capitalize">
                          <span>Storage Type:</span>
                          <span>
                            {ship.storage.capacityType
                              .replace('container solid liquid', 'any')
                              .replace('container condensate', 'container')}
                          </span>
                        </p>
                      ) : (
                        <p className="x4-ships__value text--capitalize">
                          {' '}
                          <span>Storage Type:</span>
                          <span>-</span>
                        </p>
                      )}
                      <p className="x4-ships__value x4-ships__value--indent">
                        <span>Capacity:</span> <span>{formatNumber(ship.storage.capacity)} m³</span>
                      </p>
                    </td>
                    <td>
                      {alwaysKeep.includes(ship.id) ? (
                        <button
                          className="btn btn--cta btn--delete"
                          onClick={() => setAlwaysKeep(alwaysKeep.filter((id) => id !== ship.id))}
                        >
                          Remove always keep
                        </button>
                      ) : (
                        <button className="btn btn--cta" onClick={() => setAlwaysKeep([...alwaysKeep, ship.id])}>
                          Always keep
                        </button>
                      )}
                      <button
                        className="btn btn--cta btn--delete mt"
                        onClick={() =>
                          setDisplayRace({
                            ...displayRace,
                            [ship.race]: false,
                          })
                        }
                      >
                        Remove {maps.reverseRace[ship.race]} ships
                      </button>
                      <button
                        className="btn btn--cta btn--delete"
                        onClick={() =>
                          setDisplayTypes({
                            ...displayTypes,
                            [ship.type]: false,
                          })
                        }
                      >
                        Remove {separateWords(ship.type)}s
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutBase>
  );
};

export default X4Ships;
