import React, { useEffect, useState } from 'react';

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
import {
  ActiveEquipment,
  getHighestAvailableEngineId,
  initialActiveEquipment,
  initialStateDisplayClass,
} from '../Ships/x4-ship-helpers';
import { applyEngineToTheShip } from '../ship-fitting-tool';
import { sortShips } from '../ship-sorter';
import { formatDecimal, formatNumber, maps, separateWords, translateRace } from '../x4-helpers';
import Description from './Description';
import './ShipEfficiency.scss';

const LARGE_SHIP_EXTRA_TRAVEL = 10;

const X4ShipEfficiency = () => {
  const dispatch = useAppDispatch();
  const { ships, equipment } = useAppSelector((state) => state.x4Fitting);

  const [shipsToDisplay, setShipsToDisplay] = useState<X4ShipInterfaceWithTradeAttributes[]>([]);
  const [displayClass, setDisplayClass] = useState<{ [key in X4ShipClassEnum]: boolean }>(initialStateDisplayClass);
  const [distance, setDistance] = useState(1000);
  const [jumpGates, setJumpGates] = useState(4);
  const [percentHighway, setPercentHighway] = useState(80);
  const [highwaySpeed, setHighwaySpeed] = useState(13500);
  const [highestScore, setHighestScore] = useState(0);
  const [fastestTrip, setFastestTrip] = useState(0);
  const [sort, setSort] = useState('tradeScore');
  const [type, setType] = useState('traders');

  const [activeEquipment, setActiveEquipment] = useState<ActiveEquipment>(initialActiveEquipment);

  const sortBy = (arg: string) => setSort(arg === sort ? `-${arg}` : arg);

  useEffect(() => {
    if (!ships) dispatch(getX4Ships()).then(() => dispatch(getX4Equipment()));
  }, [dispatch, ships]);

  useEffect(() => {
    if (ships && equipment) {
      let shipCollection: X4ShipInterfaceWithTradeAttributes[] = [];
      let fastestTrip = 10000000;

      const extraNormalTravelDistance = jumpGates * LARGE_SHIP_EXTRA_TRAVEL;
      const highwayDistance = (distance * percentHighway) / 100;

      Object.values(ships).forEach((ship: X4ShipInterface, index) => {
        const modifiedShip: X4ShipInterfaceWithTradeAttributes = {
          ...ship,
          accelerationTime: 0,
          distanceToMaxTravelSpeed: 0,
          travelTime: 0,
          tradeScore: 0,
          tradeIndex: 0,
          isTrader: false,
          isMiner: false,
        };

        if (
          modifiedShip.type === 'freighter' ||
          modifiedShip.type === 'transporter' ||
          modifiedShip.type === 'courier' ||
          modifiedShip.type === 'resupplier' ||
          modifiedShip.type === 'carrier' ||
          modifiedShip.type === 'scavenger' ||
          modifiedShip.type === 'tug' ||
          modifiedShip.type === 'compactor'
        ) {
          modifiedShip.isTrader = true;
        }
        if (modifiedShip.type === 'largeminer' || modifiedShip.type === 'miner') {
          modifiedShip.isMiner = true;
        }

        if (!modifiedShip.isTrader && !modifiedShip.isMiner) return;
        if (!modifiedShip.isTrader && !modifiedShip.isMiner) return;
        if (!displayClass[modifiedShip.class]) return;

        if (modifiedShip.isMiner && modifiedShip.storage.capacityType === 'solid' && type !== 'mineral') return;
        if (modifiedShip.isMiner && modifiedShip.storage.capacityType === 'liquid' && type !== 'gas') return;
        if (modifiedShip.isTrader && type !== 'traders') return;

        const isLargeShip = modifiedShip.class === 'ship_xl' || modifiedShip.class === 'ship_l';

        const engineId = getHighestAvailableEngineId(modifiedShip, activeEquipment);
        applyEngineToTheShip(modifiedShip, equipment, engineId);
        modifiedShip.outfit = { engines: engineId, thrusters: '', shields: '' };

        modifiedShip.accelerationTime = modifiedShip.speed.forward / modifiedShip.speed.acceleration;

        const timeToChargeTravelDrive = modifiedShip.speed.travel.charge;
        const timeToAccelerateToTravelSpeed = modifiedShip.speed.travel.attack;
        const travelAcceleration = modifiedShip.speed.travel.speed / timeToAccelerateToTravelSpeed;

        const distanceCoveredWhileAccelerating =
          (1 / 2) * travelAcceleration * Math.pow(timeToAccelerateToTravelSpeed, 2);

        // Remove highways for small ships. Remove distance spent accelerating at each gate
        const adjustedDistance =
          (isLargeShip ? distance * 1000 : (distance - highwayDistance) * 1000) -
          distanceCoveredWhileAccelerating * jumpGates;
        const travelSpeed = modifiedShip.speed.travel.speed;
        const normalSpeed = modifiedShip.speed.forward;

        // Large ships have to move around the gate.
        // Small ships still need to use the highway that was removed in adjusted distance
        const extraDistance = isLargeShip ? extraNormalTravelDistance * 1000 : highwayDistance * 1000;
        const extraDistanceTime = isLargeShip ? extraDistance / normalSpeed : extraDistance / highwaySpeed;

        modifiedShip.travelTime = adjustedDistance / travelSpeed + extraDistanceTime;

        // At the end, we need to add the time that all ships spent trying to reach their max speed
        modifiedShip.travelTime =
          modifiedShip.travelTime + (timeToChargeTravelDrive + timeToAccelerateToTravelSpeed) * jumpGates;

        modifiedShip.tradeScore = modifiedShip.storage.capacity / modifiedShip.travelTime;
        modifiedShip.distanceToMaxTravelSpeed = distanceCoveredWhileAccelerating;
        modifiedShip.tradeIndex = index;

        if (modifiedShip.travelTime < fastestTrip) fastestTrip = modifiedShip.travelTime;

        shipCollection.push(modifiedShip);
      });

      shipCollection.sort((a, b) => (a.tradeScore < b.tradeScore ? 1 : b.tradeScore < a.tradeScore ? -1 : 0));
      shipCollection.forEach((ship, index) => (ship.tradeIndex = index + 1));

      if (shipCollection.length > 0) {
        setHighestScore(shipCollection[0].tradeScore);
        setFastestTrip(fastestTrip);
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
  }, [ships, equipment, displayClass, activeEquipment, distance, jumpGates, percentHighway, highwaySpeed, sort, type]);

  return (
    <LayoutBase>
      <div className="x4-efficiency">
        <h1>X4 Ship Efficiency</h1>
        <p className="text--small text--muted">Explanation of values is under the table</p>

        <div className="flex">
          <div className="x4-efficiency__inputs">
            <p className="text--bold">Variables used for calculations</p>
            <Input
              name="distance"
              type="number"
              value={distance}
              min={10}
              max={10000}
              label="km of total whole trip"
              handleInputChange={(e) => setDistance(parseInt(e.target.value, 10))}
            />
            <Input
              name="jumpGates"
              type="number"
              value={jumpGates}
              min={0}
              max={15}
              label="jump gates"
              handleInputChange={(e) => setJumpGates(parseInt(e.target.value, 10))}
            />
            <Input
              name="percentHighway"
              type="number"
              value={percentHighway}
              min={0}
              max={100}
              label="percent of travel on highway"
              handleInputChange={(e) => setPercentHighway(parseInt(e.target.value, 10))}
            />
            <Input
              name="highwaySpeed"
              type="number"
              value={highwaySpeed}
              min={10000}
              max={15000}
              label="m/s highway speed"
              handleInputChange={(e) => setHighwaySpeed(parseInt(e.target.value, 10))}
            />
          </div>
          <div>
            <p className="text--bold">Travel engines you want to use (when possible)</p>
            <Select
              value={activeEquipment.engine}
              options={[
                { value: 'engine_RACE_SIZE_allround_01_mk1', label: 'All-round Mk.1' },
                { value: 'engine_RACE_SIZE_allround_01_mk2', label: 'All-round Mk.2' },
                { value: 'engine_RACE_SIZE_allround_01_mk3', label: 'All-round Mk.3' },
                { value: 'engine_RACE_SIZE_travel_01_mk1', label: 'Travel Mk.1' },
                { value: 'engine_RACE_SIZE_travel_01_mk2', label: 'Travel Mk.2' },
                { value: 'engine_RACE_SIZE_travel_01_mk3', label: 'Travel Mk.3' },
                { value: 'engine_RACE_SIZE_combat_01_mk1', label: 'Combat Mk.1' },
                { value: 'engine_RACE_SIZE_combat_01_mk2', label: 'Combat Mk.2' },
                { value: 'engine_RACE_SIZE_combat_01_mk3', label: 'Combat Mk.3' },
                { value: 'engine_RACE_SIZE_combat_01_mk4', label: 'Combat Mk.4' },
              ]}
              name="engine-type"
              label="Engine type"
              handleInputChange={(e) =>
                setActiveEquipment({
                  ...activeEquipment,
                  engineRace: e.target.value === 'engine_RACE_SIZE_combat_01_mk4' ? 'spl' : activeEquipment.engineRace,
                  engine: e.target.value,
                })
              }
            />{' '}
            <Select
              value={activeEquipment.engineRace}
              options={[
                { value: 'arg', label: 'Argon' },
                { value: 'par', label: 'Paranid' },
                { value: 'spl', label: 'Split' },
                { value: 'tel', label: 'Teladi' },
                { value: 'ter', label: 'Terran' },
              ]}
              name="engine-race"
              label="Engine race"
              handleInputChange={(e) =>
                setActiveEquipment({
                  ...activeEquipment,
                  engineRace: e.target.value,
                  engine:
                    e.target.value !== 'spl' ? activeEquipment.engine.replace('mk4', 'mk3') : activeEquipment.engine,
                })
              }
            />
            <p className="text--bold mt-1">Traders or miners?</p>
            <Radio
              name="type"
              value={type}
              options={['traders', 'mineral', 'gas'].map((type) => ({ label: type, value: type }))}
              handleInputChange={(e) => setType(e.target.value)}
            />
            <span className="text--capitalize">
              {Object.keys(maps.shipClass).map((shipClassKey) => (
                <Checkbox
                  label={maps.shipClass[shipClassKey as keyof typeof displayClass].replace('extralarge', 'XL')}
                  name="shipClass"
                  checked={displayClass[shipClassKey as keyof typeof displayClass]}
                  key={shipClassKey}
                  handleInputChange={(e) =>
                    setDisplayClass({
                      ...displayClass,
                      [shipClassKey]: e.target.checked,
                    })
                  }
                />
              ))}
            </span>
            <p className="text--bold text--smaller text--muted">
              NOTICE: Miners are looked at as hauling ships, time to fill up is not considered
            </p>
          </div>
        </div>

        <div className="x4-efficiency__table-wrapper">
          <table>
            <thead>
              <tr>
                <th onClick={() => sortBy('tradeScore')} className="number">
                  #
                </th>
                <th onClick={() => sortBy('name')}>Ship</th>
                <th onClick={() => sortBy('class')} className="number">
                  Size
                </th>
                <th onClick={() => sortBy('storage')} className="number">
                  Storage
                </th>
                <th onClick={() => sortBy('speed')} className="number">
                  Speed
                  <br />
                  <span className="text--smaller text--muted">Time to reach</span>
                </th>
                <th onClick={() => sortBy('travelSpeed')} className="number">
                  Travel
                  <br />
                  <span className="text--smaller text--muted">Time to reach</span>
                </th>
                <th onClick={() => sortBy('travelTime')} className="number">
                  Time
                </th>
                <th onClick={() => sortBy('tradeScore')} className="number">
                  Throughput
                </th>
              </tr>
            </thead>
            <tbody>
              {shipsToDisplay.map((ship) => (
                <tr key={Math.random()}>
                  <td className="number">{ship.tradeIndex}.</td>
                  <td className="text--smaller text--capitalize">
                    <h2 className="text text--bold">{ship.name}</h2>
                    {translateRace(ship.race)} {separateWords(ship.type)} <br />
                    <span className="text--xs text--muted">{equipment[ship.outfit!.engines].name}</span>
                  </td>
                  <td className="text--small number text--capitalize">
                    {separateWords(maps.shipClass[ship.class].replace('extralarge', 'XL'))}
                  </td>
                  <td className="text--small number">{formatNumber(ship.storage.capacity)}m³</td>
                  <td className="text--small number">
                    {formatNumber(ship.speed.forward)}m/s
                    <br />
                    <span className="text--smaller text--muted">{formatNumber(ship.accelerationTime)} s</span>
                  </td>
                  <td className="text--small number">
                    {formatNumber(ship.speed.travel.speed)}m/s
                    <br />
                    <span className="text--smaller text--muted">
                      {formatNumber(ship.speed.travel.attack)}s / {formatNumber(ship.distanceToMaxTravelSpeed / 1000)}km
                    </span>
                  </td>
                  <td className="text--small number">
                    {formatNumber(ship.travelTime)}s <br />
                    <span className="text--smaller text--muted">
                      {formatDecimal((1 - ship.travelTime / fastestTrip) * 100)}%
                    </span>
                  </td>
                  <td className="text--small number text--bold">
                    {formatDecimal(ship.tradeScore)}m³/s <br />
                    <span className="text--smaller text--muted">
                      -{formatDecimal((1 - ship.tradeScore / highestScore) * 100)}%
                    </span>
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
