import { appWarning } from '../../../helpers/logger';

// Limit size to something reasonable, ie, we don't care for regions which are 1000's of KM large
const SIZE_LIMIT = 200 * 200 * 100;

export const calculateFieldSize = (regionDefinition) => {
  regionDefinition.miningRegionVolume = 0;

  // Ah... due to way how the parser works, this needs ot be "adjusted"...
  if (regionDefinition.boundaries) {
    regionDefinition.boundary = regionDefinition.boundaries.boundary;
    delete regionDefinition.boundaries.boundary;
  }
  if (!Array.isArray(regionDefinition.boundary)) {
    regionDefinition.boundary = [regionDefinition.boundary];
  }

  // Calculate size of mining region volume in approximate km3
  regionDefinition.boundary.forEach((boundary) => {
    if (boundary.class === 'cylinder')
      regionDefinition.miningRegionVolume += 3.14 * Math.pow(boundary.size.r / 1000, 2) * (boundary.size.linear / 1000);
    else if (boundary.class === 'box')
      regionDefinition.miningRegionVolume +=
        (boundary.size.x / 1000) * (boundary.size.y / 1000) * (boundary.size.z / 1000);
    else if (boundary.class === 'sphere')
      regionDefinition.miningRegionVolume += (4 / 3) * 3.14 * Math.pow(boundary.size.r / 1000, 3);
    else if (boundary.class === 'splinetube')
      regionDefinition.miningRegionVolume +=
        3.14 *
        Math.pow(boundary.size.r / 1000, 2) *
        boundary.splineposition.reduce((acc, currentValue, index) => {
          const x = Math.pow(currentValue.x - boundary.splineposition[index - 1].x, 2);
          const y = Math.pow(currentValue.y - boundary.splineposition[index - 1].y, 2);
          const z = Math.pow(currentValue.z - boundary.splineposition[index - 1].z, 2);
          return Math.sqrt(x + y + z);
        });
  });

  if (regionDefinition.miningRegionVolume === 0) appWarning(`${regionDefinition.name} has unknown size`);
  if (regionDefinition.miningRegionVolume > SIZE_LIMIT) regionDefinition.miningRegionVolume = SIZE_LIMIT;
  regionDefinition.miningRegionVolume = Math.floor(regionDefinition.miningRegionVolume);

  return regionDefinition;
};
