import { promises as fs } from 'fs';
import path from 'path';
import xml2js from 'xml2js';

import { appWarning } from '../../../helpers/logger';
import { saveToFile } from '../helpers';
import getGateConnections from './gate-connections';
import { addDlcToSet, applyCrazySectorTransformations, isPotentialKhaakLocation, roundMap, scaleDown } from './helpers';
import sectorHighways from './manual-data-input/_sectorHighways.json';
import { addMapDefaultDataToSector } from './map-defaults';
import processRegions from './regions';
import processStations from './stations';
import processZone from './zones';

const ORE_SILICON_CAP = 1000000000;
const ICE_CAP = 200000000;
const NIVIDIUM_CAP = 8000000;
const HYDROGEN_HELIUM_CAP = 4500000;
const METHANE_CAP = 10000000;
const RAWSCRAP_CAP = 20000000000;

const SAVE_RAW = false;

async function parseFile(pathToFile) {
  const parser = new xml2js.Parser({ mergeAttrs: true, explicitArray: false });
  return await parser.parseStringPromise(await fs.readFile(pathToFile));
}

export async function getMap(sourceBasePath, translations) {
  // Originally, approach was to loop once over each file and create object with key references
  // While that reduces code complexity in terms of quick lookups, it does in fact complicate the process
  // of building the map. This code has loops within loops..., but it logically builds a map, and it's easier to follow.
  // Also, this tasks runs only locally to generate map once, so the performance is not an issue.

  let base, split, terran, pirate, boron;
  let map = [];

  const baseSourcePath = sourceBasePath;
  const splitSourcePath = path.join(sourceBasePath, 'extensions', 'ego_dlc_split');
  const terranSourcePath = path.join(sourceBasePath, 'extensions', 'ego_dlc_terran');
  const pirateSourcePath = path.join(sourceBasePath, 'extensions', 'ego_dlc_pirate');
  const boronSourcePath = path.join(sourceBasePath, 'extensions', 'ego_dlc_boron');

  const baseSourcePathMaps = path.join(baseSourcePath, 'maps', 'xu_ep2_universe');
  const splitSourcePathMaps = path.join(splitSourcePath, 'maps', 'xu_ep2_universe');
  const terranSourcePathMaps = path.join(terranSourcePath, 'maps', 'xu_ep2_universe');
  const pirateSourcePathMaps = path.join(pirateSourcePath, 'maps', 'xu_ep2_universe');
  const boronSourcePathMaps = path.join(boronSourcePath, 'maps', 'xu_ep2_universe');

  const baseSourcePathLibraries = path.join(baseSourcePath, 'libraries');
  const splitSourcePathLibraries = path.join(splitSourcePath, 'libraries');
  const terranSourcePathLibraries = path.join(terranSourcePath, 'libraries');
  const pirateSourcePathLibraries = path.join(pirateSourcePath, 'libraries');
  const boronSourcePathLibraries = path.join(boronSourcePath, 'libraries');

  // Contains ref to clusters and destinations
  const galaxy = [
    ...(await parseFile(path.join(baseSourcePathMaps, 'galaxy.xml'))).macros.macro.connections.connection,
    ...(await parseFile(path.join(splitSourcePathMaps, 'galaxy.xml'))).diff.add.connection,
    ...(await parseFile(path.join(terranSourcePathMaps, 'galaxy.xml'))).diff.add.connection,
    ...(await parseFile(path.join(pirateSourcePathMaps, 'galaxy.xml'))).diff.add.connection,
    ...(await parseFile(path.join(boronSourcePathMaps, 'galaxy.xml'))).diff.add.connection,
  ];
  if (SAVE_RAW) await saveToFile(galaxy, '_raw-galaxy', 'raw galaxy', 'map');

  // Contains ref to sectors
  const clusters = [
    ...(await parseFile(path.join(baseSourcePathMaps, 'clusters.xml'))).macros.macro,
    ...(await parseFile(path.join(splitSourcePathMaps, 'dlc4_clusters.xml'))).macros.macro,
    ...(await parseFile(path.join(terranSourcePathMaps, 'dlc_terran_clusters.xml'))).macros.macro,
    ...(await parseFile(path.join(pirateSourcePathMaps, 'dlc_pirate_clusters.xml'))).macros.macro,
    ...(await parseFile(path.join(boronSourcePathMaps, 'dlc_boron_clusters.xml'))).macros.macro,
  ];
  if (SAVE_RAW) await saveToFile(clusters, '_raw-clusters', 'raw clusters', 'map');

  // Contains ref to zones
  const sectors = [
    ...(await parseFile(path.join(baseSourcePathMaps, 'sectors.xml'))).macros.macro,
    ...(await parseFile(path.join(splitSourcePathMaps, 'dlc4_sectors.xml'))).macros.macro,
    ...(await parseFile(path.join(terranSourcePathMaps, 'dlc_terran_sectors.xml'))).macros.macro,
    ...(await parseFile(path.join(pirateSourcePathMaps, 'dlc_pirate_sectors.xml'))).macros.macro,
    ...(await parseFile(path.join(boronSourcePathMaps, 'dlc_boron_sectors.xml'))).macros.macro,
  ];
  if (SAVE_RAW) await saveToFile(sectors, '_raw-sectors', 'raw sectors', 'map');

  // Contains possible refs to gates
  const zones = [
    ...(await parseFile(path.join(baseSourcePathMaps, 'zones.xml'))).macros.macro,
    ...(await parseFile(path.join(splitSourcePathMaps, 'dlc4_zones.xml'))).macros.macro,
    ...(await parseFile(path.join(terranSourcePathMaps, 'dlc_terran_zones.xml'))).macros.macro,
    ...(await parseFile(path.join(pirateSourcePathMaps, 'dlc_pirate_zones.xml'))).macros.macro,
    ...(await parseFile(path.join(boronSourcePathMaps, 'dlc_boron_zones.xml'))).macros.macro,
  ];
  if (SAVE_RAW) await saveToFile(zones, '_raw-zones', 'raw zones', 'map');

  // Contains last pieces of info for sector -> zones -> gate
  const components = [
    ...(await parseFile(path.join(baseSourcePathLibraries, 'component.xml'))).components.component.filter(
      (component) => component.name === 'standardzone'
    ),
  ];
  if (SAVE_RAW) await saveToFile(components, '_raw-components', 'raw components', 'map');

  // Contains region definitions (boundary sizes, density, and resources) for asteroid fields
  const regionDefinitions = [
    ...(await parseFile(path.join(baseSourcePathLibraries, 'region_definitions.xml'))).regions.region,
    ...(await parseFile(path.join(splitSourcePathLibraries, 'region_definitions.xml'))).regions.region,
    ...(await parseFile(path.join(terranSourcePathLibraries, 'region_definitions.xml'))).regions.region,
    ...(await parseFile(path.join(pirateSourcePathLibraries, 'region_definitions.xml'))).regions.region,
    ...(await parseFile(path.join(boronSourcePathLibraries, 'region_definitions.xml'))).regions.region,
  ];
  if (SAVE_RAW) await saveToFile(regionDefinitions, '_raw-region-definitions', 'region definitions', 'map');

  // Contains actual yield definitions for asteroids inside fields
  const regionObjectGroups = (await parseFile(path.join(baseSourcePathLibraries, 'regionobjectgroups.xml'))).groups
    .group;
  if (SAVE_RAW) await saveToFile(regionObjectGroups, '_raw-region-object-groups', 'region object groups', 'map');

  // Contains yield modifiers for asteroids and nebulas
  const regionYields = (await parseFile(path.join(baseSourcePathLibraries, 'regionyields.xml'))).regionyields.resource;
  if (SAVE_RAW) await saveToFile(regionYields, '_raw-region-yields', 'region yields', 'map');

  // TODO: Who knows...
  const mapDefaults = [
    ...(await parseFile(path.join(baseSourcePathLibraries, 'mapdefaults.xml'))).defaults.dataset,
    ...(await parseFile(path.join(splitSourcePathLibraries, 'mapdefaults.xml'))).defaults.dataset,
    ...(await parseFile(path.join(terranSourcePathLibraries, 'mapdefaults.xml'))).defaults.dataset,
    ...(await parseFile(path.join(pirateSourcePathLibraries, 'mapdefaults.xml'))).defaults.dataset,
    ...(await parseFile(path.join(boronSourcePathLibraries, 'mapdefaults.xml'))).defaults.dataset,
  ];
  if (SAVE_RAW) await saveToFile(mapDefaults, '_raw-map-defaults', 'map defaults', 'map');

  // Convert mapDefaults into object so that sectors can later access directly by macro ref instead of loop
  const mapDefaultsObject = {};
  mapDefaults.forEach((mapDefault) => (mapDefaultsObject[mapDefault['macro']] = mapDefault));
  if (SAVE_RAW) await saveToFile(mapDefaultsObject, '_raw-map-defaults-object', 'map defaults object', 'map');

  // TODO:  Position refers to position inside zone?
  const stationFilter = (arg) => arg.diff.add.filter((item) => item.sel === '/god/stations')[0].station;
  const stations = [
    ...(await parseFile(path.join(baseSourcePathLibraries, 'god.xml'))).god.stations.station,
    ...stationFilter(await parseFile(path.join(splitSourcePathLibraries, 'god.xml'))),
    ...stationFilter(await parseFile(path.join(terranSourcePathLibraries, 'god.xml'))),
    ...stationFilter(await parseFile(path.join(pirateSourcePathLibraries, 'god.xml'))),
    ...stationFilter(await parseFile(path.join(boronSourcePathLibraries, 'god.xml'))),
  ];
  if (SAVE_RAW) await saveToFile(stations, '_raw-map-stations', 'raw stations', 'map');

  // First pass will just build stuff in correct nesting order and adjust positions to be smaller scale
  // It will also merge the data from multiple files and do some light mutations on the data, delete excess
  // stuff and normalize the data structure

  galaxy.forEach((galaxyItem) => {
    // Handle cluster connections
    if (galaxyItem.ref === 'clusters') {
      scaleDown(galaxyItem, 80000);

      // Attach clusters
      clusters.forEach((cluster) => {
        if (galaxyItem.macro.ref === cluster.name) {
          cluster.sectors = [];
          cluster.regions = [];
          cluster.position = galaxyItem.offset.position;

          // TODO: Add cluster highways, zonehighways.xml?
          // cluster.sechighways = [];

          cluster.dlc = new Set();
          addDlcToSet(cluster.dlc, parseInt(/^[^\d]*(\d+)/.exec(cluster.name)[1]));

          cluster.connections.connection.forEach((clusterConnection) => {
            if (clusterConnection.ref === 'sectors') {
              scaleDown(clusterConnection, 80000);

              sectors.forEach((sector) => {
                if (clusterConnection.macro.ref === sector.name) {
                  sector.zones = [];
                  sector.stations = [];

                  sector = {
                    ...sector,
                    potentialHive: isPotentialKhaakLocation(sector),
                    ...addMapDefaultDataToSector(cluster, sector, mapDefaultsObject, translations),
                  };

                  sector.connections.connection.forEach((sectorConnection) => {
                    if (sectorConnection.ref === 'zones') {
                      zones.forEach((zone) => {
                        if (sectorConnection.macro.ref === zone.name) {
                          scaleDown(sectorConnection);

                          zone = processZone({ sectorConnection, zone, components });

                          // We can only process stations here, since we need to check if any of the known
                          // stations are in this sectors zone
                          processStations({ sector, stations, zone });

                          // TODO: For now we only care about zones with gates
                          if (zone.gates.length !== 0) {
                            delete zone.SHCons;
                            delete zone.highwayConnections;
                            sector.zones.push(zone);
                          }
                          sectorConnection.assigned = true;
                        }
                      });
                    } else if (sectorConnection.ref === 'zonehighways') {
                      // TODO: zonehighways.xml
                      // scaleDown(sectorConnection, 80000);
                      // sector.zonehighways.push(sectorConnection);
                      sectorConnection.skipped = true;
                    }
                  });

                  // Sanity check sector connections
                  sector.connections.connection.forEach((sectorConnection) => {
                    if (!sectorConnection.assigned && !sectorConnection.skipped)
                      appWarning(`${sectorConnection.name} connection not handled in sectors`);
                  });

                  // Cleanup sectors
                  delete sector.class;
                  delete sector.component;
                  delete sector.connections;

                  clusterConnection.assigned = true;
                  sector.position = clusterConnection.offset.position;
                  cluster.sectors.push(sector);
                }
              });
            }
            // Attach regions, we only care about mineable regions
            else if (clusterConnection.ref === 'regions') {
              scaleDown(clusterConnection, 80000);
              processRegions(clusterConnection, cluster, regionDefinitions, regionObjectGroups, regionYields);
            }
            // Attach highways
            else if (clusterConnection.ref === 'sechighways') {
              // scaleDown(clusterConnection, 80000);
              // cluster.sechighways.push(clusterConnection);
              clusterConnection.skipped = true;
            }
            // Skip content
            else if (clusterConnection.ref === 'content') clusterConnection.skipped = true;
          });

          // Sanity check cluster connections
          cluster.connections.connection.forEach((clusterConnection) => {
            if (!clusterConnection.assigned && !clusterConnection.skipped)
              appWarning(`${clusterConnection.name} connection not handled in clusters`);
          });

          // Cleanup clusters
          delete cluster.class;
          delete cluster.component;
          delete cluster.connections;

          galaxyItem.cluster = cluster;
        }
      });

      // Cleanup
      delete galaxyItem.ref;
      delete galaxyItem.macro;
      delete galaxyItem.offset;

      galaxyItem.cluster.regions.forEach((region) => {
        galaxyItem.cluster.sectors.forEach((sector) => {
          if (sector.name === region.sectorNameReference) {
            if (!sector.resources) sector.resources = [];
            if (!sector.resourcesTotal) sector.resourcesTotal = {};

            sector.resources.push({
              name: region.name,
              miningRegionVolume: region.miningRegionVolume,
              resourceQuantities: region.resourceQuantities,
            });

            Object.keys(region.resourceQuantities).forEach((resource) => {
              if (!sector.resourcesTotal[resource]) sector.resourcesTotal[resource] = 0;
              sector.resourcesTotal[resource] += region.resourceQuantities[resource];
            });

            region.assigned = true;
          }
        });

        // Sanity check for regions properly assigned to sectors
        if (!region.assigned) {
          appWarning(`${region.name} did not found corresponding sector`);
          console.log(sectorName);
        }
      });

      delete galaxyItem.cluster.regions;
      map.push(galaxyItem.cluster);
    }

    // Handle destination connections
    else if (galaxyItem.ref === 'destination') {
      // We don't care about this, since each gate is named in a way that it references destination and it's
      // easier to calculate the directions that way...
    }

    // Sanity check galaxy
    else appWarning(`${galaxyItem.name} unknown ref`);
  });

  map.forEach((cluster) => {
    applyCrazySectorTransformations(cluster);
    cluster.dlc = Array.from(cluster.dlc);

    cluster.sectors.forEach((sector) => {
      if (sector.resourcesTotal) {
        if (!sector.resourcePoints) sector.resourcePoints = {};
        Object.keys(sector.resourcesTotal).forEach((resource) => {
          if (resource === 'ore' || resource === 'silicon') {
            sector.resourcePoints[resource] = Math.ceil((sector.resourcesTotal[resource] / ORE_SILICON_CAP) * 100);
          } else if (resource === 'nividium') {
            sector.resourcePoints[resource] = Math.ceil((sector.resourcesTotal[resource] / NIVIDIUM_CAP) * 100);
          } else if (resource === 'hydrogen' || resource === 'helium') {
            sector.resourcePoints[resource] = Math.ceil((sector.resourcesTotal[resource] / HYDROGEN_HELIUM_CAP) * 100);
          } else if (resource === 'methane') {
            sector.resourcePoints[resource] = Math.ceil((sector.resourcesTotal[resource] / METHANE_CAP) * 100);
          } else if (resource === 'ice') {
            sector.resourcePoints[resource] = Math.ceil((sector.resourcesTotal[resource] / ICE_CAP) * 100);
          } else if (resource === 'rawscrap') {
            sector.resourcePoints[resource] = Math.ceil((sector.resourcesTotal[resource] / RAWSCRAP_CAP) * 100);
          }
        });
      }
      delete sector.resourcesTotal;

      sector.zones.forEach((zone) => {
        zone.position = { x: roundMap(zone.position.x), z: roundMap(zone.position.z) };
      });
    });
  });

  return {
    clusters: map,
    gateConnections: getGateConnections(map),
    sectorHighways: sectorHighways.data,
  };
}
