import { X4MapSectorInterface } from '../../../redux/x4/map';
import { backgroundLabelRectWidth, maps } from '../x4-helpers';

const DEBUG = false;

export const SectorNameTag = ({ sector }: { sector: X4MapSectorInterface }) => {
  const label = DEBUG ? sector.name : sector.label;
  const backgroundWidth = label.length * 3 - backgroundLabelRectWidth(label) + 5;
  const verticalOffset = sector.transformation ? 45 : 95;
  return (
    <>
      <rect
        x={sector.position.x - backgroundWidth}
        y={-sector.position.z - verticalOffset}
        width={backgroundWidth * 2}
        height="13"
        fill="black"
        stroke={sector.owner ? maps.colors[sector.owner].border : 'white'}
        strokeWidth="1"
      />
      <text
        x={sector.position.x}
        y={-sector.position.z - verticalOffset + 10.5}
        fontSize="12px"
        textAnchor="middle"
        fill="white"
      >
        {label}
      </text>
    </>
  );
};
