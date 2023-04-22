// Some of the data we need for sectors are defined in mapDefaults, like sunlight, description, etc..
import { translateRecursiveTrim } from '../translations';

export const addMapDefaultDataToSector = (cluster, sector, mapDefaultsObject, translations) => {
  const clusterMapDefault = mapDefaultsObject[cluster.name];
  const sectorMapDefault = mapDefaultsObject[sector.name];

  // Can be inherited from cluster or defined in sector itself!
  let sunlight = 1;
  // Sector name as it's called in game
  let label = 'Unknown';
  let description = '';

  if (clusterMapDefault)
    if (clusterMapDefault.properties.area)
      if (clusterMapDefault.properties.area.sunlight) sunlight = parseFloat(clusterMapDefault.properties.area.sunlight);

  if (sectorMapDefault) {
    label = translateRecursiveTrim(sectorMapDefault.properties.identification.name, translations);
    description = translateRecursiveTrim(sectorMapDefault.properties.identification.description, translations);

    if (sectorMapDefault.properties.area)
      if (sectorMapDefault.properties.area.sunlight) sunlight = parseFloat(sectorMapDefault.properties.area.sunlight);
  }

  return {
    sunlight,
    label,
    description,
  };
};
