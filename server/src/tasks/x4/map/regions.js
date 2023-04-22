import { appWarning } from '../../../helpers/logger';
import { calculateFieldSize } from './area-calculations';

export default function processRegions(
  clusterConnection,
  cluster,
  regionDefinitions,
  regionObjectGroups,
  regionYields
) {
  if (isMineableRegion(clusterConnection)) {
    regionDefinitions.forEach((regionDefinitionItem) => {
      if (clusterConnection.macro.properties.region.ref === regionDefinitionItem.name) {
        // WARNING: Make new object here, lots of things are referencing same thing
        let regionDefinition = { ...regionDefinitionItem };

        regionDefinition.position = clusterConnection.offset.position;

        // TODO: Delete
        regionDefinition.locationReference = clusterConnection.macro.name;

        // If region has no resources
        if (!regionDefinition.resources) return (clusterConnection.skipped = true);
        if (!regionDefinition.resources.resource) return (clusterConnection.skipped = true);

        // Will fix some wrong references
        correctErrors(clusterConnection, regionDefinition);

        // Will add miningRegionVolume to regionDefinition
        regionDefinition = calculateFieldSize(regionDefinition);

        // Fill in data for each asteroid and delete extra attributes
        if (regionDefinition.fields.asteroid) {
          if (!Array.isArray(regionDefinition.fields.asteroid))
            regionDefinition.fields.asteroid = [regionDefinition.fields.asteroid];

          regionDefinition.fields.asteroid.forEach((asteroid) =>
            regionObjectGroups.forEach((object) => {
              if (asteroid.groupref === object.name) {
                asteroid.resource = object.resource;
                asteroid.yield = object.yield;
                asteroid.yieldvariation = object.yieldvariation;
              }
            })
          );
        }

        // Fill in data for each scrap field and delete extra attributes
        if (regionDefinition.fields.debris) {
          if (!Array.isArray(regionDefinition.fields.debris))
            regionDefinition.fields.debris = [regionDefinition.fields.debris];

          regionDefinition.fields.debris.forEach((debris) =>
            regionObjectGroups.forEach((object) => {
              if (debris.groupref === object.name) {
                debris.resource = object.resource;
                debris.yield = object.yield;
                debris.yieldvariation = object.yieldvariation;
              }
            })
          );
        }

        if (regionDefinition.fields.nebula && !Array.isArray(regionDefinition.fields.nebula))
          regionDefinition.fields.nebula = [regionDefinition.fields.nebula];

        regionDefinition.resourceQuantities = {};
        if (!Array.isArray(regionDefinition.resources.resource))
          regionDefinition.resources.resource = [regionDefinition.resources.resource];

        const regionDensity = parseFloat(regionDefinition.density);
        const regionMinNoise = parseFloat(regionDefinition.minnoisevalue) || 0;
        const regionMaxNoise = parseFloat(regionDefinition.maxnoisevalue) || 1;
        const regionMinMaxNoise = (regionMinNoise + regionMaxNoise) / 2;

        regionDefinition.resources.resource.forEach((resource) => {
          regionDefinition.resourceQuantities[resource.ware] = 0;

          if (regionDefinition.fields.asteroid)
            regionDefinition.fields.asteroid.forEach((asteroid) => {
              if (asteroid.resource === resource.ware) {
                const densityFactor = parseFloat(asteroid.densityfactor);
                const minMaxNoise = (parseFloat(asteroid.minnoisevalue) + parseFloat(asteroid.maxnoisevalue)) / 2;
                const ayield = parseFloat(asteroid.yield);
                const yieldVariation = parseFloat(asteroid.yieldvariation);

                const asteroidProps = densityFactor * minMaxNoise * ayield * yieldVariation;

                regionDefinition.resourceQuantities[resource.ware] += Math.floor(asteroidProps);
              }
            });

          if (regionDefinition.fields.nebula)
            regionDefinition.fields.nebula.forEach((nebula) => {
              nebula.resources.split(' ').forEach((nebulaResource) => {
                if (nebulaResource === resource.ware) {
                  regionDefinition.resourceQuantities[resource.ware] += 1;
                }
              });
            });

          if (regionDefinition.fields.debris) {
            regionDefinition.fields.debris.forEach((debris) => {
              const densityFactor = parseFloat(debris.densityfactor);
              const minMaxNoise = (parseFloat(debris.minnoisevalue) + parseFloat(debris.maxnoisevalue)) / 2;
              const ayield = parseFloat(debris.yield);
              const yieldVariation = parseFloat(debris.yieldvariation);

              const debrisProps = densityFactor * minMaxNoise * ayield * yieldVariation;

              regionDefinition.resourceQuantities['rawscrap'] += Math.floor(debrisProps);
            });
          }

          regionYields.forEach((regionYield) => {
            if (regionYield.ware === resource.ware)
              regionYield.yield.map((yieldItem) => {
                const regionYieldResourceDensity = parseFloat(yieldItem.resourcedensity);
                const regionYieldReplenishTime = parseFloat(yieldItem.replenishtime);
                const regionYieldGatherSpeedFactor = parseFloat(yieldItem.gatherspeedfactor);

                if (yieldItem.name === resource.yield) {
                  regionDefinition.resourceQuantities[resource.ware] = Math.floor(
                    regionDefinition.resourceQuantities[resource.ware] *
                      regionDensity *
                      regionMinMaxNoise *
                      (isNaN(regionYieldGatherSpeedFactor)
                        ? regionYieldResourceDensity
                        : regionYieldGatherSpeedFactor) *
                      regionDefinition.miningRegionVolume
                  );
                }
              });
          });
        });

        // We plan on merging these into sectors later...
        let sectorNameReference = regionDefinition.locationReference
          .replace(/_Region.*/, '')
          .replace('Cluster', 'C')
          .replace('_Sector', 'S');
        const clusterID = sectorNameReference.match(/C(.*)S/)[1];
        let sectorId = sectorNameReference.match(/S(.*)/)[1];
        if (sectorId.length === 2) sectorId = `0${sectorId}`;
        sectorNameReference = `Cluster_${clusterID}_Sector${sectorId}_macro`;
        regionDefinition.sectorNameReference = sectorNameReference;

        cluster.regions.push(regionDefinition);
        clusterConnection.assigned = true;
      }
    });
  } else {
    markedSkippedConnections(clusterConnection);
  }
}

const isMineableRegion = (clusterConnection) =>
  clusterConnection.macro.properties.region.ref.indexOf('audio') === -1 &&
  clusterConnection.macro.properties.region.ref.indexOf('mine_field') === -1 &&
  clusterConnection.macro.properties.region.ref.indexOf('wave_active') === -1 &&
  clusterConnection.macro.properties.region.ref.indexOf('torus') === -1;

// ERROR CORRECTING: Not sure how game figures this out, but there are few
//                   non-existing cluster sector references in regions.
//                   In the game they seem to appear, probably game engine has
//                   different ways of resolving this
const correctErrors = (clusterConnection, regionDefinition) => {
  if (regionDefinition.locationReference === 'C02S02_Region002_macro') {
    regionDefinition.locationReference = 'C02S01_Region002_macro';
    appWarning(`Correcting C02S02_Region002_macro to C02S01_Region002_macro`);
  }
  if (
    clusterConnection.name === 'C414S01_Region02_connection' &&
    regionDefinition.locationReference === 'C415S01_Region02_macro'
  ) {
    regionDefinition.locationReference = 'C414S01_Region02_macro';
    appWarning(`Correcting C415S01_Region02_macro to C414S01_Region02_macro`);
  }
  if (
    clusterConnection.name === 'Cluster110_Sector001_Region001_connection' &&
    regionDefinition.locationReference === 'Cluster108_Sector002_Region001_macro'
  ) {
    regionDefinition.locationReference = 'Cluster110_Sector001_Region001_macro';
    appWarning(`Correcting Cluster108_Sector002_Region001_macro to Cluster110_Sector001_Region001_macro`);
  }
  if (
    clusterConnection.name === 'Cluster112_Sector002_Region001_connection' &&
    regionDefinition.locationReference === 'Cluster104_Sector001_Region002_macro'
  ) {
    regionDefinition.locationReference = 'Cluster112_Sector002_Region002_macro';
    appWarning(`Correcting Cluster104_Sector001_Region002_macro to Cluster112_Sector002_Region002_macro`);
  }
};

const markedSkippedConnections = (clusterConnection) => {
  if (clusterConnection.macro.properties.region.ref.indexOf('audio') !== -1) {
    clusterConnection.skipped = true;
  } else if (clusterConnection.macro.properties.region.ref.indexOf('mine_field') !== -1) {
    clusterConnection.skipped = true;
  } else if (clusterConnection.macro.properties.region.ref === 'wave_active') {
    clusterConnection.skipped = true;
  } else if (clusterConnection.macro.properties.region.ref === 'region504wave_active') {
    clusterConnection.skipped = true;
  } else if (clusterConnection.macro.properties.region.ref === 'region_cluster_33_sector_001') {
    clusterConnection.skipped = true;
  } else if (clusterConnection.macro.properties.region.ref === 'cluster113_region02') {
    clusterConnection.skipped = true;
  } else if (clusterConnection.macro.properties.region.ref === 'region_c503s01_casino2') {
    clusterConnection.skipped = true;
  } else if (clusterConnection.macro.properties.region.ref.indexOf('torus') !== -1) {
    clusterConnection.skipped = true;
  }
};
