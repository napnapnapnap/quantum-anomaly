import { X4MapClusterInterface, X4MapSectorInterface } from '../../../redux/x4/map';
import { getHexagonPointsV2, maps } from '../x4-helpers';

export const Sector = ({ cluster, sector }: { cluster: X4MapClusterInterface; sector: X4MapSectorInterface }) => (
  <polyline
    stroke={sector.owner ? maps.colors[sector.owner].border : 'gray'}
    strokeWidth="2"
    fill={sector.owner ? maps.colors[sector.owner].border : 'gray'}
    fillOpacity="0.2"
    points={getHexagonPointsV2(
      {
        x: sector.position.x,
        y: -sector.position.z,
      },
      cluster.sectors.length < 2 ? 1 : 2
    )}
  />
);
