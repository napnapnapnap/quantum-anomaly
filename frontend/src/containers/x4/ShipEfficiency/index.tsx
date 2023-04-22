import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import { SortIndicator } from '../../../components/Helpers';
import Checkbox from '../../../components/Inputs/Checkbox';
import Input from '../../../components/Inputs/Input';
import Radio from '../../../components/Inputs/Radio';
import Select from '../../../components/Inputs/Select';
import { seo } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import LayoutBase from '../../../layouts/Base';
import {
  X4ShipClassEnum,
  X4ShipInterface,
  X4ShipInterfaceWithTradeAttributes,
  getX4Equipment,
  getX4Ships,
} from '../../../redux/x4/fitting';
import { getX4Wares } from '../../../redux/x4/wares';
import {
  ActiveEquipment,
  getHighestAvailableEngineId,
  initialActiveEquipment,
  initialStateDisplayClass,
} from '../Ships/x4-ship-helpers';
import { applyEngineToTheShip, timeToCoverDistance } from '../ship-fitting-tool';
import { sortShips } from '../ship-sorter';
import {
  formatDecimal,
  formatNumber,
  isLargeShip,
  isLiquidMiner,
  isSolidMiner,
  isTradingShip,
  isTradingShipExpanded,
  maps,
  separateWords,
  translateRace,
} from '../x4-helpers';
import Description from './Description';
import './ShipEfficiency.scss';

const LARGE_SHIP_EXTRA_TRAVEL_DISTANCE_WITHOUT_TRAVEL_DRIVE = 10000; // in meters

interface TripProfileInterface {
  distance: number;
  gates: number;
  percentOfHighway: number;
  highwaySpeed: number;
  wareId: string;
  shipType: 'trade' | 'trade-exp' | 'solid' | 'liquid' | string;
}

const X4ShipEfficiency = () => {
  const dispatch = useAppDispatch();
  const { ships, equipment } = useAppSelector((state) => state.x4Fitting);
  const { wares } = useAppSelector((state) => state.x4Wares);

  const [tripProfile, setTripProfile] = useState<TripProfileInterface>({
    distance: 1000, // in km
    gates: 4,
    percentOfHighway: 85,
    highwaySpeed: 13500, // in meters/s
    wareId: 'none',
    shipType: 'container',
  });

  const [shipsToDisplay, setShipsToDisplay] = useState<X4ShipInterfaceWithTradeAttributes[]>([]);
  const [displayClass, setDisplayClass] = useState<{ [key in X4ShipClassEnum]: boolean }>(initialStateDisplayClass);
  const [selectedShip, setSelectedShip] = useState<X4ShipInterfaceWithTradeAttributes | null>(null);
  const [sort, setSort] = useState('tradeScore');
  const [chassisMod, setChassisMod] = useState('none');
  const [travelMod, setTravelMod] = useState('none');

  const [activeEquipment, setActiveEquipment] = useState<ActiveEquipment>(initialActiveEquipment);

  const sortBy = (arg: string) => setSort(arg === sort ? `-${arg}` : arg);

  useEffect(() => {
    if (!ships) dispatch(getX4Ships());
    if (ships && !equipment) dispatch(getX4Equipment());
    if (ships && equipment && !wares) dispatch(getX4Wares());
  }, [dispatch, ships, equipment, wares]);

  useEffect(() => {
    setTripProfile({
      ...tripProfile,
      wareId: 'none',
    });
  }, [tripProfile.shipType]);

  useEffect(() => {
    if (ships && equipment && wares) {
      const accelerationCounts = tripProfile.gates + 1;

      let shipCollection: X4ShipInterfaceWithTradeAttributes[] = [];
      let fastestTripInSeconds = 10000000;
      let bestTradeScore = 0;
      let selectedShip: X4ShipInterfaceWithTradeAttributes | null = null;

      Object.values(ships).forEach((ship: X4ShipInterface, index) => {
        const modifiedShip: X4ShipInterfaceWithTradeAttributes = {
          ...ship,
          name: ship.name.replace(/ \(Solid\)/, ' Solid').replace(/ \(Gas\)/, ' Gas'),
          accelerationTime: 0,
          distanceToMaxTravelSpeed: 0,
          runsOutOfDistance: false,
          travelTime: 0,
          tradeScore: 0,
          tradeIndex: 0,
          isTrader: isTradingShip(ship),
          isTraderExpanded: isTradingShipExpanded(ship),
          isSolidMiner: isSolidMiner(ship),
          isLiquidMiner: isLiquidMiner(ship),
          creditsPerHour: 0,
        };

        if (!displayClass[modifiedShip.class]) return;
        else if (
          !modifiedShip.isTrader &&
          !modifiedShip.isTraderExpanded &&
          !modifiedShip.isSolidMiner &&
          !modifiedShip.isLiquidMiner
        )
          return;
        else if (!modifiedShip.isSolidMiner && tripProfile.shipType === 'solid') return;
        else if (!modifiedShip.isLiquidMiner && tripProfile.shipType === 'liquid') return;
        else if (!modifiedShip.isTrader && tripProfile.shipType === 'container') return;
        else if (!modifiedShip.isTraderExpanded && tripProfile.shipType === 'container-exp') return;

        if (tripProfile.shipType === 'container') {
          if (ship.id === 'ship_gen_m_yacht_01_a_macro') return;
          else if (ship.id === 'ship_par_m_trans_container_03_a_macro') return;
          else if (ship.id === 'ship_pir_s_trans_condensate_01_a_macro') return;
        }

        const engineId = getHighestAvailableEngineId(modifiedShip, activeEquipment);
        applyEngineToTheShip(modifiedShip, equipment, engineId, [travelMod, chassisMod]);
        modifiedShip.outfit = { engines: engineId, thrusters: '', shields: '' };
        modifiedShip.accelerationTime = modifiedShip.speed.forward / modifiedShip.speed.acceleration;

        const normalSpeed = modifiedShip.speed.forward;
        const travelSpeed = modifiedShip.speed.travel.speed;
        const timeToChargeTravelDrive = modifiedShip.speed.travel.charge;
        const timeToAccelerateToTravelSpeed = modifiedShip.speed.travel.attack;
        const travelAcceleration = modifiedShip.speed.travel.speed / timeToAccelerateToTravelSpeed;

        const distanceNeededToAccelerateToFullSpeed =
          (1 / 2) * travelAcceleration * Math.pow(timeToAccelerateToTravelSpeed, 2);
        let distanceNeededToTravel = (tripProfile.distance * 1000) / (tripProfile.gates + 1);

        // Start by setting total trip time as minimum time needed to active travel drive
        let totalTripTime = timeToChargeTravelDrive * accelerationCounts;

        // Remove the highways from distance on small and medium ships and add time that would be spent on highways
        if (!isLargeShip(ship)) {
          distanceNeededToTravel =
            (tripProfile.distance * 1000) / (tripProfile.gates + 1) -
            ((tripProfile.distance * 1000) / (tripProfile.gates + 1)) * (tripProfile.percentOfHighway / 100);
          totalTripTime +=
            (((tripProfile.distance * 1000) / (tripProfile.gates + 1)) * (tripProfile.percentOfHighway / 100)) /
            tripProfile.highwaySpeed;
        }

        // Large ships need extra time around gates
        if (isLargeShip(ship))
          totalTripTime += (tripProfile.gates * LARGE_SHIP_EXTRA_TRAVEL_DISTANCE_WITHOUT_TRAVEL_DRIVE) / normalSpeed;

        // If the segment is smaller than distance needed to accelerate to full speed, calculate how much time
        // ship will need to actually cover that distance
        // Otherwise just reuse already calculated time needed to reach full speed and take away the distance covered
        if (distanceNeededToTravel < distanceNeededToAccelerateToFullSpeed) {
          totalTripTime += timeToCoverDistance(distanceNeededToTravel, travelAcceleration) * accelerationCounts;
          modifiedShip.runsOutOfDistance = true;
        } else
          totalTripTime +=
            (timeToAccelerateToTravelSpeed +
              (distanceNeededToTravel - distanceNeededToAccelerateToFullSpeed) / travelSpeed) *
            accelerationCounts;

        modifiedShip.travelTime = totalTripTime;
        modifiedShip.tradeScore = modifiedShip.storage.capacity / modifiedShip.travelTime;
        modifiedShip.distanceToMaxTravelSpeed = distanceNeededToAccelerateToFullSpeed;
        modifiedShip.tradeIndex = index;

        if (tripProfile.wareId !== 'none') {
          const profitPerUnit =
            parseInt(wares.transport[tripProfile.wareId].price.average) * 1.25 -
            parseInt(wares.transport[tripProfile.wareId].price.average) * 0.75;

          const unitsMovedPerHour =
            (modifiedShip.tradeScore * 60 * 60) / parseInt(wares.transport[tripProfile.wareId].volume);

          modifiedShip.creditsPerHour = unitsMovedPerHour * profitPerUnit;
        }

        if (modifiedShip.travelTime < fastestTripInSeconds) fastestTripInSeconds = modifiedShip.travelTime;

        if (modifiedShip.tradeScore > bestTradeScore) {
          bestTradeScore = modifiedShip.tradeScore;
          selectedShip = modifiedShip;
        }

        shipCollection.push(modifiedShip);
      });

      shipCollection.sort((a, b) => (a.tradeScore < b.tradeScore ? 1 : b.tradeScore < a.tradeScore ? -1 : 0));
      shipCollection.forEach((ship, index) => (ship.tradeIndex = index + 1));

      if (shipCollection.length > 0) {
        setSelectedShip(selectedShip);
      }

      setShipsToDisplay(sortShips(shipCollection, sort) as X4ShipInterfaceWithTradeAttributes[]);

      const shipNames = Object.values(shipCollection).map((ship) =>
        ship.name.replace('Vanguard', '').replace('Sentinel', '')
      );

      seo({
        title: 'X4 Ship Efficiency',
        metaDescription: 'X4 Foundations, Split Vendetta and Cradle of Humanity ships efficiency calculations',
        // @ts-ignore
        keywords: [...new Set(shipNames)],
      });
    }
  }, [
    ships,
    tripProfile.distance,
    tripProfile.gates,
    tripProfile.percentOfHighway,
    tripProfile.shipType,
    tripProfile.wareId,
    equipment,
    displayClass,
    activeEquipment,
    sort,
    wares,
    travelMod,
    chassisMod,
  ]);

  return (
    <LayoutBase>
      <div className="x4-efficiency">
        <h1>X4 Ship Efficiency</h1>
        <div className="x4-efficiency__controls">
          <div>
            <p className="text--bold">Trip profile settings to use</p>
            <Input
              name="distance"
              type="number"
              value={tripProfile.distance}
              min={10}
              max={5000}
              label="Total trip lenght:"
              isInlineLabel
              handleInputChange={(e) => setTripProfile({ ...tripProfile, distance: parseInt(e.target.value, 10) })}
            />
            <Input
              name="jumpGates"
              type="number"
              value={tripProfile.gates}
              min={0}
              max={15}
              label="Jump gates:"
              isInlineLabel
              handleInputChange={(e) => setTripProfile({ ...tripProfile, gates: parseInt(e.target.value, 10) })}
            />
            <Input
              name="percentHighway"
              type="number"
              value={tripProfile.percentOfHighway}
              min={0}
              max={100}
              label="Highway percentage:"
              isInlineLabel
              handleInputChange={(e) =>
                setTripProfile({ ...tripProfile, percentOfHighway: parseInt(e.target.value, 10) })
              }
            />
            {wares && (
              <>
                <Select
                  value={tripProfile.wareId}
                  options={[
                    { label: 'Empty cargohold', value: 'none' },
                    ...Object.values(wares.transport)
                      .filter((ware) => {
                        return ware.transport === tripProfile.shipType.replace('-exp', '');
                      })
                      .map((ware) => ({ label: ware.name, value: ware.id })),
                  ]}
                  name="wareSelect"
                  handleInputChange={(e) => setTripProfile({ ...tripProfile, wareId: e.target.value })}
                />
                <p className="text--bold text--xs text--muted">Buy at average -25%, sell at average +25%</p>
              </>
            )}
          </div>
          <div>
            <p className="text--bold">Ship engines to use</p>
            <Select
              value={activeEquipment.engine}
              options={maps.engineOptions}
              name="engine-type"
              handleInputChange={(e) =>
                setActiveEquipment({
                  ...activeEquipment,
                  engine: e.target.value,
                })
              }
            />
            <Select
              value={activeEquipment.engineRace}
              options={maps.raceOptions}
              name="engine-race"
              handleInputChange={(e) =>
                setActiveEquipment({
                  ...activeEquipment,
                  engineRace: e.target.value,
                })
              }
            />
            <p className="text--xs text--muted text--bold">
              If a given ship can't use requested configuration, it will use closest alternative available.
            </p>
          </div>
          <div>
            <p className="text--bold">Ship function and sizes</p>
            <Select
              value={tripProfile.shipType}
              options={[
                { label: 'Trading ships', value: 'container' },
                { label: 'Trading ships expanded', value: 'container-exp' },
                { label: 'Solid mining ships', value: 'solid' },
                { label: 'Liquid mining ships', value: 'liquid' },
              ]}
              name="shipType"
              handleInputChange={(e) => setTripProfile({ ...tripProfile, shipType: e.target.value })}
            />
            <div className="x4-efficiency__ship-size">
              {Object.keys(maps.shipClass).map((shipClassKey) => (
                <Checkbox
                  label={maps.shipClass[shipClassKey as keyof typeof displayClass].replace('extralarge', 'XL')}
                  name="shipClass"
                  checked={displayClass[shipClassKey as keyof typeof displayClass]}
                  className="text--capitalize"
                  key={shipClassKey}
                  handleInputChange={(e) =>
                    setDisplayClass({
                      ...displayClass,
                      [shipClassKey]: e.target.checked,
                    })
                  }
                />
              ))}
            </div>
            <p className="text--xs text--muted text--bold">
              Miners are looked at only from hauling aspect, time to find field and fill up is not considered.
            </p>
          </div>
          <div>
            <p className="text--bold">Mods (Experimental)</p>
            <Radio
              name="chassisMod"
              value={chassisMod}
              options={[
                { value: 'none', label: 'No chassis modifications' },
                { value: 'polisher', label: 'Polisher (-14% ship drag)' },
              ]}
              handleInputChange={(e) => setChassisMod(e.target.value)}
            />
            <Radio
              name="travelMod"
              value={travelMod}
              labelClassName="mt-1"
              options={[
                { value: 'none', label: 'No engine modifications' },
                { value: 'reaver', label: 'Reaver (+40% Engine travel thrust)' },
              ]}
              handleInputChange={(e) => setTravelMod(e.target.value)}
            />
            <p className="text--xs text--muted text--bold">
              For the moment, you can only choose predefined "good" rolls.
            </p>
          </div>
          <div className="mt-1">
            <p className="text--bold">Per sector:</p>
            <ul className="ul--packed">
              <li className="text--smaller">
                Small and medium ships will spend{' '}
                <b>
                  {formatNumber(
                    (tripProfile.distance * 1000) / (tripProfile.gates + 1) / 1000 -
                      (((tripProfile.distance * 1000) / (tripProfile.gates + 1)) *
                        (tripProfile.percentOfHighway / 100)) /
                        1000
                  )}{' '}
                  kilometers
                </b>{' '}
                to travel using their own engine power.
              </li>
              <li className="text--smaller">
                Large ships will spend{' '}
                <b>{formatNumber((tripProfile.distance * 1000) / (tripProfile.gates + 1) / 1000)} kilometers</b> to
                travel using their own engine power.
              </li>
              <li className="text--smaller">
                Rows with red distance value means that ship ran out of distance to accelerate fully.
              </li>
              <li className="text--smaller">
                {selectedShip && (
                  <>
                    All values are compared against <b>{selectedShip.name}</b>.
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="x4-efficiency__table-wrapper">
          <table>
            <thead>
              <tr>
                <th onClick={() => sortBy('tradeScore')} className="number">
                  Rank
                </th>
                <th onClick={() => sortBy('name')}>
                  Ship <SortIndicator attribute="name" activeAttribute={sort} />
                </th>
                <th onClick={() => sortBy('class')}>
                  Size <SortIndicator attribute="class" activeAttribute={sort} />
                </th>
                <th onClick={() => sortBy('storage')} className="number">
                  Storage <SortIndicator attribute="storage" activeAttribute={sort} />
                </th>
                <th onClick={() => sortBy('speed')} className="number">
                  Speed <SortIndicator attribute="speed" activeAttribute={sort} />
                  <br />
                  <span className="text--xs text--muted">Time to reach</span>
                </th>
                <th onClick={() => sortBy('travelSpeed')} className="number">
                  Travel <SortIndicator attribute="travelSpeed" activeAttribute={sort} />
                  <br />
                  <span className="text--xs text--muted">Time to reach</span>
                </th>
                <th onClick={() => sortBy('travelTime')} className="number">
                  Time <SortIndicator attribute="travelTime" activeAttribute={sort} />
                  <br />
                  <span className="text--xs text--muted">VS. active</span>
                </th>
                <th onClick={() => sortBy('tradeScore')} className="number">
                  Score <SortIndicator attribute="tradeScore" activeAttribute={sort} />
                  <br />
                  <span className="text--xs text--muted">VS. active</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {shipsToDisplay.map((ship) => (
                <tr
                  key={Math.random()}
                  className={selectedShip && ship.id === selectedShip.id ? 'active' : ''}
                  onClick={() => setSelectedShip(ship)}
                >
                  <td className="number">{ship.tradeIndex}.</td>
                  <td className="text--smaller text--capitalize">
                    <h2 className="text text--bold" style={{ borderColor: maps.colors[ship.manufacturer].color }}>
                      {ship.name}
                    </h2>
                    <span
                      className="text--smaller x4-efficiency__race"
                      style={{ borderColor: maps.colors[ship.manufacturer].color }}
                    >
                      {translateRace(ship.race)} {separateWords(ship.type)}
                    </span>{' '}
                    <br />
                    <span
                      className="text--smaller text--muted text--bold x4-efficiency__engine"
                      style={{
                        borderColor:
                          maps.colors[
                            maps.reverseRace[
                              equipment[ship.outfit!.engines].name.split(' ')[0].toLowerCase()
                            ].toLowerCase()
                          ].color,
                      }}
                    >
                      {equipment[ship.outfit!.engines].name}
                    </span>
                  </td>
                  <td className="text--small text--capitalize">
                    {separateWords(maps.shipClass[ship.class].replace('extralarge', 'XL'))}
                  </td>
                  <td className="text--small number">
                    {formatNumber(ship.storage.capacity)}m³
                    {wares && tripProfile.wareId !== 'none' && (
                      <>
                        <br />
                        <span className="text--xs">
                          {formatNumber(ship.storage.capacity / parseInt(wares.transport[tripProfile.wareId].volume))}{' '}
                          units
                        </span>
                      </>
                    )}
                  </td>
                  <td className="text--small number">
                    {formatNumber(ship.speed.forward)}m/s
                    <br />
                    <span className="text--smaller text--muted">{formatNumber(ship.accelerationTime)} s</span>
                  </td>
                  <td className="text--small number">
                    {formatNumber(ship.speed.travel.speed)}m/s
                    <br />
                    <span className="text--smaller text--muted">
                      {formatNumber(ship.speed.travel.attack)}s /{' '}
                      <span
                        className={clsx('text--smaller text--muted', {
                          'x4-efficiency__value--worse': ship.runsOutOfDistance,
                        })}
                      >
                        {formatNumber(ship.distanceToMaxTravelSpeed / 1000)}km
                      </span>
                    </span>
                  </td>
                  <td className="text--small number">
                    <span className="text--small text--bold">
                      {formatNumber(ship.travelTime)}s <br />
                    </span>
                    {selectedShip && (
                      <span
                        className={clsx('text--xs', {
                          'x4-efficiency__value--worse': (1 - ship.travelTime / selectedShip.travelTime) * 100 < 0,
                          'x4-efficiency__value--better': (1 - ship.travelTime / selectedShip.travelTime) * 100 > 0,
                        })}
                      >
                        {formatDecimal((1 - ship.travelTime / selectedShip.travelTime) * 100)}%
                      </span>
                    )}
                  </td>
                  <td className="text--small number ">
                    <p className="text--small number text--bold">{formatDecimal(ship.tradeScore)} m³/s</p>
                    {ship.creditsPerHour !== 0 && (
                      <p className="text--xs m">{formatNumber(ship.creditsPerHour)} CR/h</p>
                    )}
                    {selectedShip && (
                      <p
                        className={clsx('text--xs', {
                          'x4-efficiency__value--worse': (1 - ship.tradeScore / selectedShip.tradeScore) * 100 > 0,
                          'x4-efficiency__value--better': (1 - ship.tradeScore / selectedShip.tradeScore) * 100 < 0,
                        })}
                      >
                        {formatDecimal((1 - ship.tradeScore / selectedShip.tradeScore) * 100)}%
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Description />
      </div>
    </LayoutBase>
  );
};

export default X4ShipEfficiency;
