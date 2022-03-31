import React from "react";
import { maps } from "../helpers";

const Resources = props => {
  if (!props.resourcePoints) return null;

  const offsets = {
    ore: { x: props.transformation ? -31 : -64, z: props.transformation ? 40 : 90 },
    silicon: { x: props.transformation ? -17 : -50, z: props.transformation ? 40 : 90 },
    ice: { x: props.transformation ? -3 : -36, z: props.transformation ? 40 : 90 },
    nividium: { x: props.transformation ? 11 : -22, z: props.transformation ? 40 : 90 },
    hydrogen: { x: props.transformation ? -27 : -60, z: props.transformation ? 52 : 102 },
    helium: { x: props.transformation ? -13 : -46, z: props.transformation ? 52 : 102 },
    methane: { x: props.transformation ? 1 : -32, z: props.transformation ? 52 : 102 }
  };

  return (
    <React.Fragment>
      {["ore", "silicon", "ice", "hydrogen", "helium", "methane", "nividium"].map(resource =>
          props.resourcePoints[resource] && <React.Fragment key={Math.random()}>
            <rect x={props.adjusted.x + offsets[resource].x - 4.5}
                  y={-props.adjusted.z + offsets[resource].z - 9}
                  width="13" height="11" fill={maps.resourceColors[resource]}
                  stroke={maps.resourceColors[resource]} strokeWidth="0" rx="3px"
            />
            <text textAnchor="middle" fontSize="12px" fill="black" fontWeight="bold"
                  x={props.adjusted.x + offsets[resource].x + 1.5}
                  y={-props.adjusted.z + offsets[resource].z}>
              {props.resourcePoints[resource] > 99 ? 99 : props.resourcePoints[resource]}
            </text>
          </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Resources;
