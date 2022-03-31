import path from "path";
import { saveToFile } from "./helpers";
import xml2js from "xml2js";
import { promises as fs } from "fs";
import { appWarning } from "../../helpers/logger";
import { translateRecursiveTrim } from "./translations";

const ORE_SILICON_CAP = 1000000000;
const ICE_CAP = 200000000;
const NIVIDIUM_CAP = 8000000;
const HYDROGEN_HELIUM_CAP = 2000000;
const METHANE_CAP = 8000000;

async function parseFile(pathToFile) {
  const parser = new xml2js.Parser({ mergeAttrs: true, explicitArray: false });
  return await parser.parseStringPromise(await fs.readFile(pathToFile));
}

function scaleDown(item, factor = 1) {
  // Since numbers in game are so large, we are going to scale them down a bit
  if (!item.offset) item.offset = { position: { x: 0, y: 0, z: 0 } };
  else if (item.offset && !item.offset.position) item.offset = { position: { x: 0, y: 0, z: 0 } };
  else item.offset.position = {
      x: Math.round(parseInt(item.offset.position.x, 10) / factor * 100) / 100,
      y: Math.round(parseInt(item.offset.position.y, 10) / factor * 100) / 100,
      z: Math.round(parseInt(item.offset.position.z, 10) / factor * 100) / 100,
    };
}

function applyCrazySectorTransformations(cluster) {
  // since we are dealing with hexagons, there are few positions sector can take
  /*
           -----------               -----------
         /             \           /          6  \
        /  1         2  \         /               \
       /                 \       / 5               \
       \                 /       \                 /
        \  4         3  /         \               /
         \             /           \          7  /
          ------------              ------------
       For 2 sectors in cluster, we need to compare their relative positions
       The first sector will always be 0,0,0, we need to compare that to the next sector and then decide
       based on that, in which spot we will put the first and the second one
       For 3 sectors in cluster, we can use pretty much same approach, but they are arranged slightly different

       We can also add the base cluster position in galaxy to be able to draw it on same galaxy layer without
       having to nest it into clusters loop

       For one sector, just make the sectors position same as cluster...
       For two sectors, figure out relative positions of second to first, yes, this is messy shotgun development,
       but... For three sectors, there is only one instance of these in game, so, hardcode it...
   */


  if (cluster.sectors.length === 1) cluster.sectors[0].adjusted = cluster.position;

  if (cluster.sectors.length === 2) {
    cluster.sectors[0].adjusted = { ...cluster.position };
    cluster.sectors[1].adjusted = { ...cluster.position };
    // It is very very tempting to group these, but due to all the factors it gets really tricky
    // Better leave as this, it is ugly, but it has cascading if else effect and it's actually very safe way
    // of checking things
    if (cluster.sectors[0].position.x === 0 && cluster.sectors[0].position.z === 0 && cluster.sectors[1].position.x === 0 && cluster.sectors[1].position.z > 0) {
      cluster.sectors[0].adjusted = { x: cluster.position.x + 32, z: cluster.position.z - 54 };
      cluster.sectors[1].adjusted = { x: cluster.position.x - 32, z: cluster.position.z + 54 };
      cluster.sectors[0].transformation = "A";
      cluster.sectors[1].transformation = "A";
    } else if (cluster.sectors[0].position.x === 0 && cluster.sectors[0].position.z === 0 && cluster.sectors[1].position.x === 0 && cluster.sectors[1].position.z < -2000) {
      cluster.sectors[0].adjusted = { x: cluster.position.x - 32, z: cluster.position.z + 54 };
      cluster.sectors[1].adjusted = { x: cluster.position.x + 32, z: cluster.position.z - 54 };
      cluster.sectors[0].transformation = "B";
      cluster.sectors[1].transformation = "B";
    } else if (cluster.sectors[0].position.x === 0 && cluster.sectors[0].position.z === 0 && cluster.sectors[1].position.x === 0 && cluster.sectors[1].position.z < 0) {
      cluster.sectors[0].adjusted = { x: cluster.position.x + 32, z: cluster.position.z + 54 };
      cluster.sectors[1].adjusted = { x: cluster.position.x - 32, z: cluster.position.z - 54 };
      cluster.sectors[0].transformation = "C";
      cluster.sectors[1].transformation = "C";
    } else if (cluster.sectors[1].position.x < 0) {
      cluster.sectors[0].adjusted.x = cluster.position.x + 32;
      cluster.sectors[1].adjusted.x = cluster.position.x - 32;
      if (cluster.sectors[1].position.z < 0) {
        cluster.sectors[0].adjusted.z = cluster.position.z + 54;
        cluster.sectors[1].adjusted.z = cluster.position.z - 54;
        cluster.sectors[0].transformation = "D";
        cluster.sectors[1].transformation = "D";
      } else if (cluster.sectors[1].position.z > 0) {
        cluster.sectors[0].adjusted.z = cluster.position.z - 54;
        cluster.sectors[1].adjusted.z = cluster.position.z + 54;
        cluster.sectors[0].transformation = "E";
        cluster.sectors[1].transformation = "E";
      }
    } else if (cluster.sectors[1].position.x > 0 && cluster.sectors[1].position.z > 0) {
      cluster.sectors[0].adjusted = { x: cluster.position.x - 32, z: cluster.position.z - 54 };
      cluster.sectors[1].adjusted = { x: cluster.position.x + 32, z: cluster.position.z + 54 };
      cluster.sectors[0].transformation = "F";
      cluster.sectors[1].transformation = "F";
    } else if (cluster.sectors[1].position.x > 0 && cluster.sectors[1].position.z < 0) {
      cluster.sectors[0].adjusted = { x: cluster.position.x - 32, z: cluster.position.z + 54 };
      cluster.sectors[1].adjusted = { x: cluster.position.x + 32, z: cluster.position.z - 54 };
      cluster.sectors[0].transformation = "G";
      cluster.sectors[1].transformation = "G";
    } else if (cluster.sectors[1].position.z === 0) {
      cluster.sectors[0].adjusted = { x: cluster.position.x - 32, z: cluster.position.z - 54 };
      cluster.sectors[1].adjusted = { x: cluster.position.x + 32, z: cluster.position.z + 54 };
      cluster.sectors[0].transformation = "H";
      cluster.sectors[1].transformation = "H";
      // special flake
      if (cluster.name === "Cluster_42_macro") {
        cluster.sectors[0].adjusted = { x: cluster.position.x - 32, z: cluster.position.z + 54 };
        cluster.sectors[1].adjusted = { x: cluster.position.x + 32, z: cluster.position.z - 54 };
        cluster.sectors[0].transformation = "I";
        cluster.sectors[1].transformation = "I";
      }
    }
  }
  if (cluster.sectors.length === 3) {
    cluster.sectors[0].adjusted = cluster.position;
    cluster.sectors[1].adjusted = cluster.position;
    cluster.sectors[2].adjusted = cluster.position;
    // special flake
    if (cluster.name === "Cluster_01_macro") {
      cluster.sectors[0].adjusted = { x: cluster.position.x + 32, z: cluster.position.z - 54 };
      cluster.sectors[2].adjusted = { x: cluster.position.x + 32, z: cluster.position.z + 54 };
      cluster.sectors[1].adjusted = { x: cluster.position.x - 62, z: cluster.position.z };
      cluster.sectors[0].transformation = "S";
      cluster.sectors[1].transformation = "S";
      cluster.sectors[2].transformation = "S";
    }

    // special flake2
    if (cluster.name === "Cluster_108_macro") {
      cluster.sectors[0].adjusted = { x: cluster.position.x + 62, z: cluster.position.z };
      cluster.sectors[1].adjusted = { x: cluster.position.x - 32, z: cluster.position.z - 54 };
      cluster.sectors[2].adjusted = { x: cluster.position.x - 32, z: cluster.position.z + 54 };
      cluster.sectors[0].transformation = "T";
      cluster.sectors[1].transformation = "T";
      cluster.sectors[2].transformation = "T";
    }

    // special flake3
    if (cluster.name === "Cluster_500_macro") {
      cluster.sectors[0].adjusted = { x: cluster.position.x + 32, z: cluster.position.z + 54 };
      cluster.sectors[1].adjusted = { x: cluster.position.x + 32, z: cluster.position.z - 54 };
      cluster.sectors[2].adjusted = { x: cluster.position.x - 62, z: cluster.position.z };
      cluster.sectors[0].transformation = "AV";
      cluster.sectors[1].transformation = "AV";
      cluster.sectors[2].transformation = "AV";
    }
  }

  cluster.sectors.forEach(sector => sector.zones.forEach(zone => {
    const inSectorDivider = !sector.transformation ? 3000 : 6000;
    zone.position = {
      x: sector.adjusted.x + zone.position.x / inSectorDivider,
      z: sector.adjusted.z + zone.position.z / inSectorDivider
    };

    zone.gates.forEach(gate => {
      gate.position = {
        x: zone.position.x + gate.position.x / inSectorDivider,
        z: zone.position.z + gate.position.z / inSectorDivider
      };
    });
  }));

  cluster.sectors.forEach(sector => sector.stations.forEach(station => {
    const inSectorDivider = !sector.transformation ? 3000 : 6000;
    if (!station.position) station.position = { x: 0, z: 0 };

    if (station.isInZone)
      station.position = {
        x: sector.adjusted.x + station.zonePositionOffset.x / inSectorDivider + station.position.x / inSectorDivider,
        z: sector.adjusted.z + station.zonePositionOffset.z / inSectorDivider + station.position.z / inSectorDivider
      };
    else
      station.position = {
        x: sector.adjusted.x + station.position.x / inSectorDivider,
        z: sector.adjusted.z + station.position.z / inSectorDivider
      };

    // since some of these things are literally on top of each other, do some "adjustment"
    if (station.id === "shipyard_holyorder") station.position.x -= 20;
    else if (station.id === "shipyard_antigone" || station.id === "tradestation_antigone") station.position.z -= 10;
    else if (station.id === "wharf_xenon_cluster_424" || station.id === "shipyard_xenon_cluster_112"
      || station.id === "shipyard_paranid" || station.id === "wharf_freesplit_01" || station.id === "wharf_split_01"
      || station.id === "wharf_xenon_cluster_415" || station.id === "ter_shipyard_cluster_104_sector002"
      || station.id === "ter_wharf_cluster_101_sector001") {
      station.position.x += 20;
      station.position.z += 5;
    } else if (station.id === "equipmentdock_ministry_01") {
      station.position.x += 20;
      station.position.z -= 10;
    } else if (station.id === "wharf_teladi_01") {
      station.position.x -= 20;
      station.position.z += 5;
    }
  }));

  return cluster;
}

export async function getMap(sourceBasePath, translations) {
  // Originally, approach was to loop once over each file and create object with key references
  // While that reduces code complexity in terms of quick lookups, it does in fact complicate the process
  // of building the map. This code has loops within loops within loops within loops..., but it logically
  // builds a map and it's easier to follow. Also this tasks runs only locally to generate map once, so
  // performance is not an issue.
  let base, split, terran, pirate;
  let map = [];

  const baseSP = sourceBasePath;
  const splitSP = path.join(sourceBasePath, "extensions", "ego_dlc_split");
  const terranSP = path.join(sourceBasePath, "extensions", "ego_dlc_terran");
  const pirateSP = path.join(sourceBasePath, "extensions", "ego_dlc_pirate");

  // Contains ref to clusters and destinations
  base = await parseFile(path.join(baseSP, "maps", "xu_ep2_universe", "galaxy.xml"));
  split = await parseFile(path.join(splitSP, "maps", "xu_ep2_universe", "galaxy.xml"));
  terran = await parseFile(path.join(terranSP, "maps", "xu_ep2_universe", "galaxy.xml"));
  pirate = await parseFile(path.join(pirateSP, "maps", "xu_ep2_universe", "galaxy.xml"));
  const galaxy = [...base.macros.macro.connections.connection, ...split.diff.add.connection, ...terran.diff.add.connection, ...pirate.diff.add.connection];
  await saveToFile(galaxy, "_raw-galaxy", "raw galaxy", "map");

  // Contains ref to sectors
  base = await parseFile(path.join(baseSP, "maps", "xu_ep2_universe", "clusters.xml"));
  split = await parseFile(path.join(splitSP, "maps", "xu_ep2_universe", "dlc4_clusters.xml"));
  terran = await parseFile(path.join(terranSP, "maps", "xu_ep2_universe", "dlc_terran_clusters.xml"));
  pirate = await parseFile(path.join(pirateSP, "maps", "xu_ep2_universe", "dlc_pirate_clusters.xml"));
  const clusters = ([...base.macros.macro, ...split.macros.macro, ...terran.macros.macro, ...pirate.macros.macro]);
  await saveToFile(clusters, "_raw-clusters", "raw clusters", "map");

  // Contains ref to zones
  base = await parseFile(path.join(baseSP, "maps", "xu_ep2_universe", "sectors.xml"));
  split = await parseFile(path.join(splitSP, "maps", "xu_ep2_universe", "dlc4_sectors.xml"));
  terran = await parseFile(path.join(terranSP, "maps", "xu_ep2_universe", "dlc_terran_sectors.xml"));
  pirate = await parseFile(path.join(pirateSP, "maps", "xu_ep2_universe", "dlc_pirate_sectors.xml"));
  const sectors = [...base.macros.macro, ...split.macros.macro, ...terran.macros.macro, ...pirate.macros.macro];
  await saveToFile(sectors, "_raw-sectors", "raw sectors", "map");

  // Contains possible refs to gates
  base = await parseFile(path.join(baseSP, "maps", "xu_ep2_universe", "zones.xml"));
  split = await parseFile(path.join(splitSP, "maps", "xu_ep2_universe", "dlc4_zones.xml"));
  terran = await parseFile(path.join(terranSP, "maps", "xu_ep2_universe", "dlc_terran_zones.xml"));
  pirate = await parseFile(path.join(pirateSP, "maps", "xu_ep2_universe", "dlc_pirate_zones.xml"));
  const zones = [...base.macros.macro, ...split.macros.macro, ...terran.macros.macro, ...pirate.macros.macro];
  await saveToFile(zones, "_raw-zones", "raw zones", "map");

  // Contains last pieces of info for sector -> zones -> gate
  base = await parseFile(path.join(baseSP, "libraries", "component.xml"));
  const components = [...base.components.component.filter(component => component.name === "standardzone")];
  await saveToFile(components, "_raw-components", "raw components", "map");

  // Contains region definitions (boundary sizes, density, and resources) for asteroid fields
  base = await parseFile(path.join(baseSP, "libraries", "region_definitions.xml"));
  split = await parseFile(path.join(splitSP, "libraries", "region_definitions.xml"));
  terran = await parseFile(path.join(terranSP, "libraries", "region_definitions.xml"));
  pirate = await parseFile(path.join(pirateSP, "libraries", "region_definitions.xml"));
  const regionDefinitions = [...base.regions.region, ...split.regions.region, ...terran.regions.region, ...pirate.regions.region];
  await saveToFile(regionDefinitions, "_raw-region-definitions", "region definitions", "map");

  // Contains actual yield definitions for asteroids inside fields
  let regionObjectGroups = await parseFile(path.join(baseSP, "libraries", "regionobjectgroups.xml"));
  regionObjectGroups = regionObjectGroups.groups.group;
  await saveToFile(regionObjectGroups, "_raw-region-object-groups", "region object groups", "map");

  // Contains yield modifiers for asteroids and nebulas
  let regionYields = await parseFile(path.join(baseSP, "libraries", "regionyields.xml"));
  regionYields = regionYields.regionyields.resource;
  await saveToFile(regionYields, "_raw-region-yields", "region yields", "map");

  base = await parseFile(path.join(baseSP, "libraries", "mapdefaults.xml"));
  split = await parseFile(path.join(splitSP, "libraries", "mapdefaults.xml"));
  terran = await parseFile(path.join(terranSP, "libraries", "mapdefaults.xml"));
  pirate = await parseFile(path.join(pirateSP, "libraries", "mapdefaults.xml"));

  const mapDefaults = [...base.defaults.dataset, ...split.defaults.dataset, ...terran.defaults.dataset, ...pirate.defaults.dataset];
  await saveToFile(mapDefaults, "_raw-map-defaults", "map defaults", "map");

  // Contains stations
  base = await parseFile(path.join(baseSP, "libraries", "god.xml"));
  split = await parseFile(path.join(splitSP, "libraries", "god.xml"));
  terran = await parseFile(path.join(terranSP, "libraries", "god.xml"));
  pirate = await parseFile(path.join(pirateSP, "libraries", "god.xml"));
  const splitDlcStations = split.diff.add.filter(item => item.sel === "/god/stations");
  const terranDlcStations = terran.diff.add.filter(item => item.sel === "/god/stations");
  const pirateDlcStations = pirate.diff.add.filter(item => item.sel === "/god/stations");

  // Position refers to position inside zone?
  const stations = [...base.god.stations.station, ...splitDlcStations[0].station, ...terranDlcStations[0].station, ...pirateDlcStations[0].station];
  await saveToFile(stations, "_raw-map-stations", "raw stations", "map");

  // First pass will just build stuff in correct nesting order and adjust positions to be smaller scale
  // Once this is done, result will be normalized object that we can loop again and actually calculate
  // useful data out, replace the translations, etc...
  galaxy.forEach(galaxyItem => {
    // Handle cluster connections
    if (galaxyItem.ref === "clusters") {
      // WARNING: Mutates object
      scaleDown(galaxyItem, 80000);

      // Attach clusters
      clusters.forEach(cluster => {
        if (galaxyItem.macro.ref === cluster.name) {
          cluster.sectors = [];
          cluster.regions = [];
          cluster.sechighways = [];
          cluster.position = galaxyItem.offset.position;

          cluster.connections.connection.forEach(clusterConnection => {
            // Attach sectors
            if (clusterConnection.ref === "sectors") {
              // WARNING: Mutates object
              scaleDown(clusterConnection, 80000);

              sectors.forEach(sector => {
                if (clusterConnection.macro.ref === sector.name) {
                  sector.zones = [];
                  sector.zonehighways = []; // TODO: zonehighways.xml
                  sector.sunlight = 1;
                  sector.label = "Unknown";
                  sector.stations = [];

                  mapDefaults.forEach(mapDefault => {
                    if (sector.name === mapDefault.macro) {
                      sector.label = translateRecursiveTrim(mapDefault.properties.identification.name, translations);
                      sector.description = translateRecursiveTrim(mapDefault.properties.identification.description, translations);

                      if (mapDefault.properties.area) {
                        if (mapDefault.properties.area.sunlight) sector.sunlight = parseFloat(mapDefault.properties.area.sunlight);
                      }
                    }
                  });

                  sector.connections.connection.forEach(sectorConnection => {
                    if (sectorConnection.ref === "zones") {
                      zones.forEach(zone => {
                        if (sectorConnection.macro.ref === zone.name) {
                          // WARNING: Mutates object
                          scaleDown(sectorConnection);

                          sectorConnection.assigned = true;

                          zone.position = sectorConnection.offset.position;
                          zone.gates = [];
                          zone.SHCons = [];
                          zone.highwayConnections = [];
                          zone.stations = [];

                          // Add stations to zones
                          stations.forEach(station => {
                            if (!station.location.macro) return;
                            if (station.assigned) return;

                            const isInSector = station.location.macro.toLowerCase() === sector.name.toLowerCase();
                            const isInZone = station.location.macro.toLowerCase() === zone.name.toLowerCase();

                            if (isInZone || isInSector) {
                              let tags = "station";
                              if (station.type === "tradingstation") tags = "tradestation";

                              if (station.station.select && station.station.select.tags)
                                tags = station.station.select.tags.replace(/\[/, "").replace(/]/, "").replace(/]/, "");

                              if (!station.position) station.position = { x: 0, z: 0 };
                              station.position.x = parseFloat(station.position.x);
                              station.position.z = parseFloat(station.position.z);

                              if (isInZone) {
                                station.position.x += zone.position.x;
                                station.position.z += zone.position.z;
                              }

                              sector.stations.push({
                                id: station.id,
                                race: station.race,
                                owner: station.owner,
                                tags: tags,
                                position: station.position
                              });

                              station.assigned = true;
                            }
                          });

                          if (zone.connections && typeof zone.connections !== "string") {
                            if (!Array.isArray(zone.connections.connection)) zone.connections.connection = [zone.connections.connection];

                            zone.connections.connection.forEach(zoneConnection => {
                              if (zoneConnection.ref === "gates") {
                                // WARNING: Mutates object
                                scaleDown(zoneConnection);

                                zoneConnection.assigned = true;
                                zone.gates.push({
                                  name: zoneConnection.name, position: zoneConnection.offset.position
                                });
                              } else if (zoneConnection.ref.indexOf("SHCon") !== -1) {
                                components.forEach(component => component.connections.connection.forEach(componentConnection => {
                                  if (zoneConnection.ref.toLowerCase() === componentConnection.name.toLowerCase()) {
                                    // WARNING: Mutates object
                                    scaleDown(componentConnection);

                                    zoneConnection.assigned = true;
                                    componentConnection.position = componentConnection.offset.position;
                                    delete componentConnection.offset;
                                    zone.SHCons.push(componentConnection);
                                  }
                                }));
                              } else if (zoneConnection.ref.indexOf("_gate") !== -1) {
                                components.forEach(component => component.connections.connection.forEach(componentConnection => {
                                  if (zoneConnection.ref.toLowerCase() === componentConnection.name.toLowerCase()) {
                                    // WARNING: Mutates object
                                    scaleDown(componentConnection);

                                    zoneConnection.assigned = true;
                                    componentConnection.position = componentConnection.offset.position;
                                    delete componentConnection.offset;
                                    zone.highwayConnections.push(componentConnection);
                                  }
                                }));
                              } else if (zoneConnection.ref === "anything" || zoneConnection.ref === "objects" || zoneConnection.ref === "asteroids") {
                                zoneConnection.skipped = true;
                              }
                            });

                            // Sanity check zone connections
                            zone.connections.connection.forEach(zoneConnection => {
                              if (!zoneConnection.assigned && !zoneConnection.skipped) {
                                appWarning(`${zoneConnection.name} connection not handled in zone`);
                              }
                            });
                          }

                          // Cleanup zones
                          delete zone.class;
                          delete zone.component;
                          delete zone.connections;
                          sector.zones.push(zone);
                        }
                      });
                    } else if (sectorConnection.ref === "zonehighways") {
                      // WARNING: Mutates object
                      scaleDown(sectorConnection, 80000);

                      sectorConnection.assigned = true;
                      // TODO: HEREHEHERHEHERE zonehighways.xml
                      sector.zonehighways.push(sectorConnection);
                    }
                  });

                  // Sanity check sector connections
                  sector.connections.connection.forEach(sectorConnection => {
                    if (!sectorConnection.assigned && !sectorConnection.skipped) appWarning(`${sectorConnection.name} connection not handled in sectors`);
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
            // Attach highways
            else if (clusterConnection.ref === "sechighways") {
              // WARNING: Mutates object
              scaleDown(clusterConnection, 80000);

              clusterConnection.assigned = true;
              cluster.sechighways.push(clusterConnection);
            }
            // Attach regions
            else if (clusterConnection.ref === "regions") {
              // WARNING: Mutates object
              scaleDown(clusterConnection, 80000);

              if (clusterConnection.macro.properties.region.ref.indexOf("audio") === -1 && clusterConnection.macro.properties.region.ref.indexOf("mine_field") === -1 && clusterConnection.macro.properties.region.ref !== "wave_active" && clusterConnection.macro.properties.region.ref !== "region504wave_active" && clusterConnection.macro.properties.region.ref !== "region_cluster_33_sector_001" && clusterConnection.macro.properties.region.ref !== "cluster113_region02" && clusterConnection.macro.properties.region.ref !== "region_c503s01_casino2" && clusterConnection.macro.properties.region.ref.indexOf("torus") === -1) {
                regionDefinitions.forEach(regionDefinitionItem => {
                  if (clusterConnection.macro.properties.region.ref === regionDefinitionItem.name) {
                    // WARNING: Make new object here, lots of things are referencing same thing
                    const regionDefinition = { ...regionDefinitionItem };
                    regionDefinition.position = clusterConnection.offset.position;
                    regionDefinition.locationReference = clusterConnection.macro.name;

                    // ERROR CORRECTING: Not sure how game figures this out, but there are few
                    //                   non-existing cluster sector references in regions.
                    //                   In the game they seem to appear, probably game engine has
                    //                   different ways of resolving this
                    if (regionDefinition.locationReference === "C02S02_Region002_macro") {
                      regionDefinition.locationReference = "C02S01_Region002_macro";
                      appWarning(`Correcting C02S02_Region002_macro to C02S01_Region002_macro`);
                    }
                    if (clusterConnection.name === "C414S01_Region02_connection" && regionDefinition.locationReference === "C415S01_Region02_macro") {
                      regionDefinition.locationReference = "C414S01_Region02_macro";
                      appWarning(`Correcting C415S01_Region02_macro to C414S01_Region02_macro`);
                    }
                    if (clusterConnection.name === "Cluster110_Sector001_Region001_connection" && regionDefinition.locationReference === "Cluster108_Sector002_Region001_macro") {
                      regionDefinition.locationReference = "Cluster110_Sector001_Region001_macro";
                      appWarning(`Correcting Cluster108_Sector002_Region001_macro to Cluster110_Sector001_Region001_macro`);
                    }
                    if (clusterConnection.name === "Cluster112_Sector002_Region001_connection" && regionDefinition.locationReference === "Cluster104_Sector001_Region002_macro") {
                      regionDefinition.locationReference = "Cluster112_Sector002_Region002_macro";
                      appWarning(`Correcting Cluster104_Sector001_Region002_macro to Cluster112_Sector002_Region002_macro`);
                    }

                    // Calculate size of mining region volume in approximate km3
                    if (regionDefinition.boundary.class === "cylinder")
                      regionDefinition.miningRegionVolume = 3.14 * Math.pow((regionDefinition.boundary.size.r / 1000), 2) * (regionDefinition.boundary.size.linear / 1000);
                    else if (regionDefinition.boundary.class === "box")
                      regionDefinition.miningRegionVolume = (regionDefinition.boundary.size.x / 1000) * (regionDefinition.boundary.size.y / 1000) * (regionDefinition.boundary.size.z / 1000);
                    else if (regionDefinition.boundary.class === "sphere")
                      regionDefinition.miningRegionVolume = 4 / 3 * 3.14 * Math.pow((regionDefinition.boundary.size.r / 1000), 3);
                    else if (regionDefinition.boundary.class === "splinetube")
                      regionDefinition.miningRegionVolume = 3.14 * Math.pow((regionDefinition.boundary.size.r / 1000), 2) * regionDefinition.boundary.splineposition.reduce((acc, currentValue, index) => {
                        const x = Math.pow(currentValue.x - regionDefinition.boundary.splineposition[index - 1].x, 2);
                        const y = Math.pow(currentValue.y - regionDefinition.boundary.splineposition[index - 1].y, 2);
                        const z = Math.pow(currentValue.z - regionDefinition.boundary.splineposition[index - 1].z, 2);
                        return Math.sqrt(x + y + z);
                      });
                    else appWarning(`${regionDefinition.name} has unknown size`);

                    // Limit size to something usable, let's say max of 200km x 200km x 100km
                    if (regionDefinition.miningRegionVolume > 200 * 200 * 100) regionDefinition.miningRegionVolume = 200 * 200 * 100;

                    regionDefinition.miningRegionVolume = Math.floor(regionDefinition.miningRegionVolume);

                    // Fill in data for each asteroid and delete extra attributes
                    if (regionDefinition.fields.asteroid) {
                      if (!Array.isArray(regionDefinition.fields.asteroid)) regionDefinition.fields.asteroid = [regionDefinition.fields.asteroid];
                      regionDefinition.fields.asteroid.forEach(asteroid => regionObjectGroups.forEach(object => {
                        if (asteroid.groupref === object.name) {
                          asteroid.resource = object.resource;
                          asteroid.yield = object.yield;
                          asteroid.yieldvariation = object.yieldvariation;
                        }
                      }));
                    }

                    if (regionDefinition.fields.nebula) {
                      if (!Array.isArray(regionDefinition.fields.nebula)) regionDefinition.fields.nebula = [regionDefinition.fields.nebula];
                    }

                    regionDefinition.resourceQuantities = {};
                    if (!Array.isArray(regionDefinition.resources.resource)) regionDefinition.resources.resource = [regionDefinition.resources.resource];
                    regionDefinition.resources.resource.forEach(resource => {
                      const regionDensity = parseFloat(regionDefinition.density);
                      const regionMinNoise = parseFloat(regionDefinition.minnoisevalue) || 0;
                      const regionMaxNoise = parseFloat(regionDefinition.maxnoisevalue) || 1;
                      const regionMinMaxNoise = (regionMinNoise + regionMaxNoise) / 2;

                      regionDefinition.resourceQuantities[resource.ware] = 0;
                      if (regionDefinition.fields.asteroid) regionDefinition.fields.asteroid.forEach(asteroid => {
                        if (asteroid.resource === resource.ware) {
                          const asteroidDensityFactor = parseFloat(asteroid.densityfactor) > 50 ? 3 : parseFloat(asteroid.densityfactor);
                          const asteroidMinMaxNoise = ((parseFloat(asteroid.minnoisevalue) + parseFloat(asteroid.maxnoisevalue))) / 2;
                          const asteroidYield = parseFloat(asteroid.yield);
                          const asteroidYieldVariation = parseFloat(asteroid.yieldvariation);
                          const asteroidProps = asteroidDensityFactor * asteroidMinMaxNoise * asteroidYield * asteroidYieldVariation;
                          regionDefinition.resourceQuantities[resource.ware] += Math.floor(asteroidProps);
                        }
                      });
                      if (regionDefinition.fields.nebula) regionDefinition.fields.nebula.forEach(nebula => {
                        nebula.resources.split(" ").forEach(nebulaResource => {
                          if (nebulaResource === resource.ware) {
                            const nebulaProps = parseFloat(nebula.uniformdensity);
                            regionDefinition.resourceQuantities[resource.ware] += nebulaProps;
                          }
                        });
                      });

                      regionYields.forEach(regionYield => {
                        if (regionYield.ware === resource.ware) regionYield.yield.map(yieldItem => {
                          if (yieldItem.name === resource.yield) {
                            const regionYieldResourceDensity = parseFloat(yieldItem.resourcedensity);
                            const regionYieldReplenishTime = parseFloat(yieldItem.replenishtime);
                            const regionYieldGatherSpeedFactor = parseFloat(yieldItem.gatherspeedfactor);

                            regionDefinition.resourceQuantities[resource.ware] = Math.floor(
                              regionDefinition.resourceQuantities[resource.ware]
                              * regionDensity * regionMinMaxNoise
                              * (isNaN(regionYieldGatherSpeedFactor) ? regionYieldResourceDensity : regionYieldGatherSpeedFactor)
                              * regionDefinition.miningRegionVolume
                            );
                          }
                        });
                      });

                    });

                    clusterConnection.assigned = true;
                    cluster.regions.push(regionDefinition);
                  }
                });
              } else if (clusterConnection.macro.properties.region.ref.indexOf("audio") !== -1) {
                clusterConnection.skipped = true;
              } else if (clusterConnection.macro.properties.region.ref.indexOf("mine_field") !== -1) {
                clusterConnection.skipped = true;
              } else if (clusterConnection.macro.properties.region.ref === "wave_active") {
                clusterConnection.skipped = true;
              } else if (clusterConnection.macro.properties.region.ref === "region504wave_active") {
                clusterConnection.skipped = true;
              } else if (clusterConnection.macro.properties.region.ref === "region_cluster_33_sector_001") {
                clusterConnection.skipped = true;
              } else if (clusterConnection.macro.properties.region.ref === "cluster113_region02") {
                clusterConnection.skipped = true;
              } else if (clusterConnection.macro.properties.region.ref === "region_c503s01_casino2") {
                clusterConnection.skipped = true;
              } else if (clusterConnection.macro.properties.region.ref.indexOf("torus") !== -1) {
                clusterConnection.skipped = true;
              }
            }
            // Skip content
            else if (clusterConnection.ref === "content") clusterConnection.skipped = true;
          });

          // Sanity check cluster connections
          cluster.connections.connection.forEach((clusterConnection) => {
            if (!clusterConnection.assigned && !clusterConnection.skipped) appWarning(`${clusterConnection.name} connection not handled in clusters`);
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

      map.push(galaxyItem);
    }

    // Handle destination connections
    else if (galaxyItem.ref === "destination") {

    }

    // Sanity check galaxy
    else {
      appWarning(`${galaxyItem.name} unknown ref`);
    }
  });

  map.forEach(galaxyConnection => {
    galaxyConnection.cluster.regions.forEach(region => {
      let sectorName = region.locationReference
        .replace(/_Region.*/, "")
        .replace("Cluster", "C")
        .replace("_Sector", "S");

      const clusterID = sectorName.match(/C(.*)S/)[1];
      let sectorId = sectorName.match(/S(.*)/)[1];
      if (sectorId.length === 2) sectorId = `0${sectorId}`;
      sectorName = `Cluster_${clusterID}_Sector${sectorId}_macro`;

      galaxyConnection.cluster.sectors.forEach(sector => {
        if (sector.name === sectorName) {
          if (!sector.resources) sector.resources = [];
          if (!sector.resourcesTotal) sector.resourcesTotal = {};

          sector.resources.push({
            name: region.name,
            miningRegionVolume: region.miningRegionVolume,
            resourceQuantities: region.resourceQuantities
          });

          Object.keys(region.resourceQuantities).forEach(resource => {
            if (!sector.resourcesTotal[resource]) sector.resourcesTotal[resource] = 0;
            sector.resourcesTotal[resource] += region.resourceQuantities[resource];

            // Some regions are super big, so limits are placed
            if (resource === "ore" || resource === "silicon") {
              if (sector.resourcesTotal[resource] > ORE_SILICON_CAP) sector.resourcesTotal[resource] = ORE_SILICON_CAP;
            } else if (resource === "nividium") {
              if (sector.resourcesTotal[resource] > NIVIDIUM_CAP) sector.resourcesTotal[resource] = NIVIDIUM_CAP;
            } else if (resource === "hydrogen" || resource === "helium") {
              if (sector.resourcesTotal[resource] > HYDROGEN_HELIUM_CAP) sector.resourcesTotal[resource] = HYDROGEN_HELIUM_CAP;
            } else if (resource === "methane") {
              if (sector.resourcesTotal[resource] > METHANE_CAP) sector.resourcesTotal[resource] = METHANE_CAP;
            } else if (resource === "ice") {
              if (sector.resourcesTotal[resource] > METHANE_CAP) sector.resourcesTotal[resource] = ICE_CAP;
            }
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

    delete galaxyConnection.cluster.regions;
  });

  // Finish up the remaining things
  // We no longer need wrapper galaxyConnection, so get rid of it
  map = map.map(galaxyConnection => galaxyConnection.cluster);

  const sectorOwners = {
    Cluster_108_Sector003_macro: "terran"
  };

  stations.forEach(station => {
    if (
      station.id.indexOf("shipyard") !== -1 || station.id.indexOf("defence") !== -1 ||
      station.id.indexOf("wharf") !== -1 || station.id.indexOf("equipmentdock") !== -1 ||
      station.id.indexOf("tradestation") !== -1 || station.type === "tradingstation"
    ) {
      const cluster = station.location.macro.match(/cluster_(.*?)_/)[1];
      const sector = station.location.macro.match(/sector(.*?)_/)[1];
      const sectorId = `Cluster_${cluster}_Sector${sector}_macro`;
      if (station.station.select && !sectorOwners[sectorId]) sectorOwners[sectorId] = station.station.select.faction;
      else if (!sectorOwners[sectorId]) sectorOwners[sectorId] = station.owner;
    }
  });

  map.forEach(cluster => {
    cluster.sectors.forEach(sector => {
      sector.owner = sectorOwners[sector.name];

      if (sector.resourcesTotal) {
        if (!sector.resourcePoints) sector.resourcePoints = {};
        Object.keys(sector.resourcesTotal).forEach(resource => {
          if (resource === "ore" || resource === "silicon") {
            sector.resourcePoints[resource] = Math.ceil((sector.resourcesTotal[resource] / ORE_SILICON_CAP) * 100);
          } else if (resource === "nividium") {
            sector.resourcePoints[resource] = Math.ceil((sector.resourcesTotal[resource] / NIVIDIUM_CAP) * 100);
          } else if (resource === "hydrogen" || resource === "helium") {
            sector.resourcePoints[resource] = Math.ceil((sector.resourcesTotal[resource] / HYDROGEN_HELIUM_CAP) * 100);
          } else if (resource === "methane") {
            sector.resourcePoints[resource] = Math.ceil((sector.resourcesTotal[resource] / METHANE_CAP) * 100);
          } else if (resource === "ice") {
            sector.resourcePoints[resource] = Math.ceil((sector.resourcesTotal[resource] / ICE_CAP) * 100);
          }
        });
      }
      delete sector.resourcesTotal;
    });
  });

  map.forEach(cluster => applyCrazySectorTransformations(cluster));

  const gates = {};
  map.forEach(cluster => {
    cluster.sectors.forEach(sector => sector.zones.forEach(zone => {
      zone.gates.forEach(gate => {
        const connectionBetween = gate.name.toLowerCase().replace("connection_clustergate", "");
        const oneSide = connectionBetween.split("to")[0];
        const otherSide = connectionBetween.split("to")[1] || "666";
        if (!gates[`${oneSide}${otherSide}`] && !gates[`${otherSide}${oneSide}`]) {
          gates[`${oneSide}${otherSide}`] = {
            start: {
              x: gate.position.x,
              z: gate.position.z
            }
          };
        }
      });
    }));
  });

  map.forEach(cluster => {
    cluster.sectors.forEach(sector => sector.zones.forEach(zone => {
      zone.gates.forEach(gate => {
        const connectionBetween = gate.name.toLowerCase().replace("connection_clustergate", "");
        const oneSide = connectionBetween.split("to")[1] || "666";
        const otherSide = connectionBetween.split("to")[0];

        if (gates[`${oneSide}${otherSide}`]) {
          gates[`${oneSide}${otherSide}`].end = {
            x: gate.position.x,
            z: gate.position.z
          };
        }
      });
    }));
  });


  return {
    clusters: map,
    gates,
    sectorHighways: [
      {
        "origin": {
          "x": -1694,
          "y": -1157
        },
        "destination": {
          "x": -1662,
          "y": -1223
        }
      },
      {
        "origin": {
          "x": -1494,
          "y": -1043
        },
        "destination": {
          "x": -1479,
          "y": -1100
        }
      },
      {
        "origin": {
          "x": -2015,
          "y": -298
        },
        "destination": {
          "x": -2094,
          "y": -353
        }
      },
      {
        "origin": {
          "x": -983,
          "y": -514
        },
        "destination": {
          "x": -915,
          "y": -565
        }
      },
      {
        "origin": {
          "x": -405,
          "y": -886
        },
        "destination": {
          "x": -363,
          "y": -837
        }
      },
      {
        "origin": {
          "x": 901,
          "y": -1215
        },
        "destination": {
          "x": 955,
          "y": -1164
        }
      },
      {
        "origin": {
          "x": 1500,
          "y": -471
        },
        "destination": {
          "x": 1487,
          "y": -384
        }
      },
      {
        "origin": {
          "x": -2192,
          "y": 466
        },
        "destination": {
          "x": -2282,
          "y": 460
        }
      },
      {
        "origin": {
          "x": -751,
          "y": 634
        },
        "destination": {
          "x": -729,
          "y": 680
        }
      },
      {
        "origin": {
          "x": -384,
          "y": 678
        },
        "destination": {
          "x": -353,
          "y": 621
        }
      },
      {
        "origin": {
          "x": -370,
          "y": -402
        },
        "destination": {
          "x": -379,
          "y": -477
        }
      },
      {
        "origin": {
          "x": -175,
          "y": 59
        },
        "destination": {
          "x": -184,
          "y": 142
        }
      },
      {
        "origin": {
          "x": -175,
          "y": 59
        },
        "destination": {
          "x": -184,
          "y": 142
        }
      },
      {
        "origin": {
          "x": -64,
          "y": -26
        },
        "destination": {
          "x": 1,
          "y": -27
        }
      },
      {
        "origin": {
          "x": -28,
          "y": 15
        },
        "destination": {
          "x": -3,
          "y": 41
        }
      },
      {
        "origin": {
          "x": 19,
          "y": 28
        },
        "destination": {
          "x": 53,
          "y": -27
        }
      },
      {
        "origin": {
          "x": 396,
          "y": 239
        },
        "destination": {
          "x": 321,
          "y": 189
        }
      },
      {
        "origin": {
          "x": 1312,
          "y": -278
        },
        "destination": {
          "x": 1308,
          "y": -393
        }
      },
      {
        "origin": {
          "x": 939,
          "y": 178
        },
        "destination": {
          "x": 925,
          "y": 58
        }
      },
      {
        "origin": {
          "x": 1123,
          "y": -58
        },
        "destination": {
          "x": 1152,
          "y": 64
        }
      },
      {
        "origin": {
          "x": 1336,
          "y": 353
        },
        "destination": {
          "x": 1279,
          "y": 268
        }
      },
      {
        "origin": {
          "x": 1090,
          "y": 413
        },
        "destination": {
          "x": 1173,
          "y": 448
        }
      },
      {
        "origin": {
          "x": -2283,
          "y": 377
        },
        "destination": {
          "x": -2210,
          "y": 408
        }
      },
      {
        "origin": {
          "x": -38,
          "y": -245
        },
        "destination": {
          "x": 20,
          "y": -242
        }
      },
      {
        "origin": {
          "x": 47,
          "y": -239
        },
        "destination": {
          "x": 18,
          "y": -187
        }
      }
    ]
  };
}
