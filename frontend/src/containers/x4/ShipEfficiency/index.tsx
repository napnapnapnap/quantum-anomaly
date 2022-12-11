import React, { useEffect, useState } from 'react';

import { seo } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import LayoutClient from '../../../layouts/Client';
import {
  X4ShipInterface,
  X4ShipInterfaceWithTradeAttributes,
  getX4Equipment,
  getX4Ships,
} from '../../../redux/x4/fitting';
import { getHighestAvailableEngineId } from '../Ships/x4-ship-helpers';
import { applyEngineToTheShip } from '../ship-fitting-tool';
import { sortShips } from '../ship-sorter';
import { formatDecimal, formatNumber, maps, separateWords, translateRace } from '../x4-helpers';
import Description from './Description';
import './ShipEfficiency.scss';

const LARGE_SHIP_EXTRA_TRAVEL = 10;
const ENGINE_RACES = ['arg', 'par', 'spl', 'tel', 'ter'];

const X4ShipEfficiency = () => {
  const dispatch = useAppDispatch();
  const { ships, equipment } = useAppSelector((state) => state.x4Fitting);

  const [shipsToDisplay, setShipsToDisplay] = useState<X4ShipInterfaceWithTradeAttributes[]>([]);
  const [race, setRace] = useState('arg');
  const [distance, setDistance] = useState(1000);
  const [jumpGates, setJumpGates] = useState(4);
  const [percentHighway, setPercentHighway] = useState(80);
  const [highwaySpeed, setHighwaySpeed] = useState(13500);
  const [highestScore, setHighestScore] = useState(0);
  const [sort, setSort] = useState('tradeScore');

  const sortBy = (arg: string) => setSort(arg === sort ? `-${arg}` : arg);

  useEffect(() => {
    if (!ships) dispatch(getX4Ships()).then(() => dispatch(getX4Equipment()));

    if (ships && equipment) {
      let shipCollection: X4ShipInterfaceWithTradeAttributes[] = [];

      const extraNormalTravelDistance = jumpGates * LARGE_SHIP_EXTRA_TRAVEL;
      const highwayDistance = (distance * percentHighway) / 100;

      const activeEquipment = {
        thruster: 'thruster_gen_SIZE_combat_01_mk3',
        engine: 'engine_RACE_SIZE_travel_01_mk3',
        engineRace: race,
        shield: 'shield_RACE_SIZE_standard_01_mk3',
        shieldRace: 'ter',
      };

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
          modifiedShip.type === 'frigate' ||
          modifiedShip.type === 'gunboat' ||
          modifiedShip.type === 'tug' ||
          modifiedShip.type === 'corvete' ||
          modifiedShip.type === 'compactor'
        ) {
          modifiedShip.isTrader = true;
        }
        if (modifiedShip.type === 'largeminer' || modifiedShip.type === 'miner') {
          modifiedShip.isMiner = true;
        }

        if (!modifiedShip.isTrader && !modifiedShip.isMiner) return;
        if (modifiedShip.isMiner) return;
        const isLargeShip = modifiedShip.class === 'ship_xl' || modifiedShip.class === 'ship_l';

        const engineId = getHighestAvailableEngineId(modifiedShip, activeEquipment);
        applyEngineToTheShip(modifiedShip, equipment, engineId);

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
        shipCollection.push(modifiedShip);
      });

      shipCollection.sort((a, b) => (a.tradeScore < b.tradeScore ? 1 : b.tradeScore < a.tradeScore ? -1 : 0));
      shipCollection.forEach((ship, index) => (ship.tradeIndex = index + 1));
      setHighestScore(shipCollection[0].tradeScore);
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
  }, [dispatch, ships, equipment, race, distance, jumpGates, percentHighway, highwaySpeed, sort]);

  return (
    <LayoutClient>
      <div className="x4-efficiency">
        <h1>X4 Ship Efficiency</h1>
        <p className="text--small text--muted">Explanation of values is under the table</p>

        <div className="flex">
          <div>
            <p className="text--bold">Variables used for calculations</p>
            <label>
              <input
                type="number"
                defaultValue="1000"
                min="10"
                max="10000"
                onChange={(e) => setDistance(parseInt(e.target.value, 10))}
              />{' '}
              km of total whole trip
            </label>
            <label>
              <input
                type="number"
                defaultValue="4"
                min="0"
                max="15"
                onChange={(e) => setJumpGates(parseInt(e.target.value, 10))}
              />{' '}
              jump gates
            </label>
            <label>
              <input
                type="number"
                defaultValue="80"
                min="0"
                max="100"
                onChange={(e) => setPercentHighway(parseInt(e.target.value, 10))}
              />{' '}
              percent of travel on highway
            </label>
            <label>
              <input
                type="number"
                defaultValue="13500"
                min="10000"
                max="15000"
                onChange={(e) => setHighwaySpeed(parseInt(e.target.value, 10))}
              />{' '}
              m/s highway speed
            </label>
          </div>
          <div>
            <p className="text--bold">Travel engines you want to use (highest Mk available for class)</p>
            {ENGINE_RACES.map((race, index) => (
              <label className="label--row" key={race}>
                <input
                  type="radio"
                  name="engines"
                  value={race}
                  defaultChecked={index === 0}
                  onChange={(e) => setRace(race)}
                />{' '}
                {translateRace(race)}
              </label>
            ))}
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
                    {translateRace(ship.race)} {separateWords(ship.type)}
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
                  <td className="text--small number">{formatNumber(ship.travelTime)}s</td>
                  <td className="text--small number">
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
    </LayoutClient>
  );
};

export default X4ShipEfficiency;
