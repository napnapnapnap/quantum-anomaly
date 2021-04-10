import React from 'react';
import {maps} from '../helpers';

const Resources = props => {
  const offsets = {
    ore: {x: props.small ? -10 : -22, y: props.small ? 13 : 33},
    silicon: {x: props.small ? -2 : -14, y: props.small ? 13 : 33},
    ice: {x: props.small ? 6 : -6, y: props.small ? 13 : 33},
    hydrogen: {x: props.small ? -10 : -22, y: props.small ? 19 : 40},
    helium: {x: props.small ? -2 : -14, y: props.small ? 19 : 40},
    methane: {x: props.small ? 6 : -6, y: props.small ? 19 : 40},
    nividium: {x: props.small ? 14 : 2, y: props.small ? 13 : 33}
  };
  const {resources} = props;
  if (!resources) return null;
  return Object.keys(resources).map(key => {
    if (resources[key] === 0 || key === 'volume' || key === 'totalFields') return null;
    return (
      <React.Fragment key={Math.random()}>
        <rect x={props.x + offsets[key].x - 2.9} y={props.y + offsets[key].y - 4.25}
              width='6.2' height='5.1' fill={maps.resourceColors[key]}
              stroke={maps.resourceColors[key]} strokeWidth='0' rx='10px'
        >
          <title>{key}</title>
        </rect>
        <text textAnchor='middle' fontSize='5px' fill='black' x={props.x + offsets[key].x} y={props.y + offsets[key].y}>
          {resources[key]}
        </text>
      </React.Fragment>
    );
  });
};

export default Resources;
