import React from 'react';

import { X4Station } from '../../../redux/x4/map';
import { maps } from '../x4-helpers';

const EquipmentDock = ({ color }: { color: string }) => (
  <React.Fragment>
    <path d="M 4 9 C 6 7, 8 9, 6 11" stroke={color} strokeWidth="1.2px" fill="transparent" />
    <path d="M 10 3 C 8 5, 10 7, 12 5" stroke={color} strokeWidth="1.2px" fill="transparent" />
    <line x1="6" y1="9" x2="10" y2="5" stroke={color} strokeWidth="1.5px" />
  </React.Fragment>
);

const TradeStation = ({ color }: { color: string }) => (
  <React.Fragment>
    <text
      textAnchor="middle"
      fill={color}
      x="7"
      y="11.5"
      fontSize="12.2px"
      fontFamily="Sans-Serif"
      fontStyle="italic"
      fontWeight="bold"
    >
      C
    </text>
    <text
      textAnchor="middle"
      fontSize="4.5px"
      fontStyle="italic"
      fontFamily="Sans-Serif"
      fontWeight="bold"
      fill={color}
      x="8.5"
      y="8.5"
    >
      R
    </text>
  </React.Fragment>
);

const Wharf = ({ color }: { color: string }) => (
  <React.Fragment>
    <polyline fill={color} stroke={color} points="6,8 8,7.5 10,8 8,5 6,8 8,7.5" />
  </React.Fragment>
);

const Shipyard = ({ color }: { color: string }) => (
  <React.Fragment>
    <polyline fill={color} stroke={color} points="6,7.5 8,6.5 10,7.5 8,3.5 6,7.5 8,6.5" />
    <rect x="5.25" y="9" width="5.5px" height="1.2px" fill={color} />
    <rect x="5.25" y="10.5" width="5.5px" height="1.2px" fill={color} />
  </React.Fragment>
);

const Pirate = ({ color }: { color: string }) => (
  <React.Fragment>
    <line x1="5" y1="11" x2="10" y2="3" stroke={color} strokeWidth="1px" />
    <line x1="11" y1="11" x2="6" y2="3" stroke={color} strokeWidth="1px" />
    <line x1="4.75" y1="8" x2="7.5" y2="10" stroke={color} strokeWidth="1px" />
    <line x1="11.75" y1="8" x2="8.5" y2="10" stroke={color} strokeWidth="1px" />
  </React.Fragment>
);

const Station = ({ station, stationScale }: { station: X4Station; stationScale: number }) => {
  if (
    station.tags !== 'tradestation' &&
    station.tags !== 'equipmentdock' &&
    station.tags !== 'wharf' &&
    station.tags !== 'shipyard' &&
    station.tags !== 'piratebase'
  )
    return <></>;

  const scale = `scale(${stationScale})`;
  const translateX = (station.position.x - 8 * stationScale) / stationScale;
  const translateY = (-station.position.z - 8 * stationScale) / stationScale;

  return (
    <g
      transform={` ${scale} translate(${translateX - 5.5 / stationScale}, ${translateY - 6.5 / stationScale})`}
      id={station.id}
    >
      <polyline
        strokeWidth={0.5}
        stroke={maps.colors[station.owner].border}
        fill="black"
        points="5,1 11,1 14.5,7 11,13 5,13 1.5,7 5,1"
      />
      {station.tags === 'tradestation' && <TradeStation color={maps.colors[station.owner].border} />}
      {station.tags === 'equipmentdock' && <EquipmentDock color={maps.colors[station.owner].border} />}
      {station.tags === 'wharf' && <Wharf color={maps.colors[station.owner].border} />}
      {station.tags === 'shipyard' && <Shipyard color={maps.colors[station.owner].border} />}
      {station.tags === 'piratebase' && <Pirate color={maps.colors[station.owner].border} />}
    </g>
  );
};

export default Station;
