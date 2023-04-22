import React from 'react';

import { X4MapSectorInterface } from '../../../redux/x4/map';
import { maps } from '../x4-helpers';

const Resources = ({ sector }: { sector: X4MapSectorInterface }) => {
  const offsets: { [key: string]: { x: number; z: number } } = {
    ore: { x: sector.transformation ? -31 : -64, z: sector.transformation ? 41 : 94 },
    silicon: { x: sector.transformation ? -17 : -50, z: sector.transformation ? 41 : 94 },
    ice: { x: sector.transformation ? -3 : -36, z: sector.transformation ? 41 : 94 },
    nividium: { x: sector.transformation ? 11 : -22, z: sector.transformation ? 41 : 94 },
    hydrogen: { x: sector.transformation ? -27 : -58, z: sector.transformation ? 52 : 105 },
    helium: { x: sector.transformation ? -13 : -44, z: sector.transformation ? 52 : 105 },
    methane: { x: sector.transformation ? 1 : -30, z: sector.transformation ? 52 : 105 },
    rawscrap: { x: sector.transformation ? 23 : 54, z: sector.transformation ? 52 : 105 },
    sun: { x: sector.transformation ? 14 : 46, z: sector.transformation ? -46 : -97 },
  };

  return (
    <React.Fragment>
      {sector.resourcePoints &&
        ['ore', 'silicon', 'ice', 'hydrogen', 'helium', 'methane', 'nividium', 'rawscrap'].map(
          (resource) =>
            sector.resourcePoints[resource] && (
              <React.Fragment key={Math.random()}>
                <rect
                  x={sector.position.x + offsets[resource].x - 4.5}
                  y={-sector.position.z + offsets[resource].z - 9}
                  width="13"
                  height="10"
                  fill={maps.resourceColors[resource]}
                  stroke={maps.resourceColors[resource]}
                  strokeWidth="0"
                  rx="3px"
                />
                <text
                  textAnchor="middle"
                  fontSize="11px"
                  fill="black"
                  fontWeight="bold"
                  x={sector.position.x + offsets[resource].x + 2}
                  y={-sector.position.z + offsets[resource].z}
                >
                  {sector.resourcePoints[resource] > 99 ? 99 : sector.resourcePoints[resource]}
                </text>
              </React.Fragment>
            )
        )}
      {sector.sunlight !== 1 && (
        <React.Fragment>
          <rect
            x={sector.position.x + offsets.sun.x - 9}
            y={-sector.position.z + offsets.sun.z - 8}
            width="25"
            height="8"
            fill="black"
            stroke={maps.resourceColors['sun']}
            strokeWidth="0"
            rx="3px"
          />
          <text
            textAnchor="middle"
            fontSize="8px"
            fill={maps.resourceColors['sun']}
            fontWeight="bold"
            x={sector.position.x + offsets.sun.x + 4}
            y={-sector.position.z + offsets.sun.z - 1}
          >
            {sector.sunlight * 100}%
          </text>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Resources;
