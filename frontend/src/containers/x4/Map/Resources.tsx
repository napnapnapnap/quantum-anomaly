import React from 'react';

import { X4MapSector } from '../../../redux/x4/map';
import { maps } from '../x4-helpers';

const Resources = ({ sector }: { sector: X4MapSector }) => {
  if (!sector.resourcePoints) return null;

  const offsets: { [key: string]: { x: number; z: number } } = {
    ore: { x: sector.transformation ? -31 : -64, z: sector.transformation ? 40 : 90 },
    silicon: { x: sector.transformation ? -17 : -50, z: sector.transformation ? 40 : 90 },
    ice: { x: sector.transformation ? -3 : -36, z: sector.transformation ? 40 : 90 },
    nividium: { x: sector.transformation ? 11 : -22, z: sector.transformation ? 40 : 90 },
    hydrogen: { x: sector.transformation ? -27 : -60, z: sector.transformation ? 52 : 102 },
    helium: { x: sector.transformation ? -13 : -46, z: sector.transformation ? 52 : 102 },
    methane: { x: sector.transformation ? 1 : -32, z: sector.transformation ? 52 : 102 },
  };

  return (
    <React.Fragment>
      {['ore', 'silicon', 'ice', 'hydrogen', 'helium', 'methane', 'nividium'].map(
        (resource) =>
          sector.resourcePoints[resource] && (
            <React.Fragment key={Math.random()}>
              <rect
                x={sector.adjusted.x + offsets[resource].x - 4.5}
                y={-sector.adjusted.z + offsets[resource].z - 9}
                width="13"
                height="11"
                fill={maps.resourceColors[resource]}
                stroke={maps.resourceColors[resource]}
                strokeWidth="0"
                rx="3px"
              />
              <text
                textAnchor="middle"
                fontSize="12px"
                fill="black"
                fontWeight="bold"
                x={sector.adjusted.x + offsets[resource].x + 1.5}
                y={-sector.adjusted.z + offsets[resource].z}
              >
                {sector.resourcePoints[resource] > 99 ? 99 : sector.resourcePoints[resource]}
              </text>
            </React.Fragment>
          )
      )}
    </React.Fragment>
  );
};

export default Resources;
