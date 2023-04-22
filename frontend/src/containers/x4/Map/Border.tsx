import { X4MapClusterInterface } from '../../../redux/x4/map';
import { getHexagonPointsV2, maps } from '../x4-helpers';

export const Border = ({ cluster }: { cluster: X4MapClusterInterface }) => {
  // 99% of cases, owner of first sector is also owner of cluster...
  // that 1% case is Hatikvah's Choice I

  let color = cluster.sectors[0].owner ? maps.colors[cluster.sectors[0].owner].border : 'gray';
  if (cluster.name === 'Cluster_29_macro') color = maps.colors['argon'].border;

  return (
    <polyline
      fill="none"
      stroke={color}
      strokeWidth="2"
      points={getHexagonPointsV2({ x: cluster.position.x, y: -cluster.position.z })}
    />
  );
};
