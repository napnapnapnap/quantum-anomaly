import xml2js from 'xml2js';
import path from 'path';
import {promises as fs} from 'fs';
import {translate} from './translations';

const defaults = ['ship_xl', 'ship_l', 'ship_m', 'ship_s'];

export async function getDefaults(sourceBasePath) {
  const parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
  const pathToFile = path.join(sourceBasePath, 'libraries', 'defaults.xml');
  const parsed = await parser.parseStringPromise(await fs.readFile(pathToFile));

  let result = {};
  parsed.defaults.dataset.forEach(dataset => {
    if (defaults.indexOf(dataset.class) !== -1)
      result[dataset.class] = {
        radarRange: dataset.properties.radar.range,
        docksize: dataset.properties.docksize.tag,
        storage: {
          countermeasure: dataset.properties.storage.countermeasure,
          deployable: dataset.properties.storage.deployable
        }
      };
  });

  return result;
}

function getPosition(offset) {
  if (!offset) return {x: 0, y: 0, z: 0};
  else return {x: parseFloat(offset.position.x), y: parseFloat(offset.position.y), z: parseFloat(offset.position.z)};
}

// it's 3 am, this thing is so messed up and all over the place in source... deal with it... and pray it doesn't break
// if it did break, just give up and do something else with your life...
export async function getMapDefaults(sourceBasePath, translations) {
  let splitSourcePath = path.join(sourceBasePath, 'extensions', 'ego_dlc_split');
  let parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});

  // from here we get list of all sectors with their name and descriptions, they can be then grouped by macro which
  // points to cluster
  let pathToFile = path.join(sourceBasePath, 'libraries', 'mapdefaults.xml');
  let pathToSplitFile = path.join(splitSourcePath, 'libraries', 'mapdefaults.xml');
  let parsed = await parser.parseStringPromise(await fs.readFile(pathToFile));
  let splitParsed = await parser.parseStringPromise(await fs.readFile(pathToSplitFile));
  const mapDefaults = parsed.defaults.dataset = [...parsed.defaults.dataset, ...splitParsed.defaults.dataset];

  let result = {sectors: {}, zones: {}, clusters: {}, stations: {}};

  // from here we can use cluster macro to find what is inside this cluster, the thing we care for is
  // asteroid fieds, we are going to take all connections and sort them under their macro name for reference later
  pathToFile = path.join(sourceBasePath, 'maps', 'xu_ep2_universe', 'clusters.xml');
  parsed = await parser.parseStringPromise(await fs.readFile(pathToFile));
  pathToFile = path.join(splitSourcePath, 'maps', 'xu_ep2_universe', 'dlc4_clusters.xml');
  splitParsed = await parser.parseStringPromise(await fs.readFile(pathToFile));
  const clusters = parsed.macros.macro = [...parsed.macros.macro, ...splitParsed.macros.macro];

  clusters.forEach(cluster => {
    result.clusters[cluster.name] = [];
    cluster.connections.connection.forEach(connection => {
      result.clusters[cluster.name].push(connection);
    });
  });

  // from sectors we get zone ofc! makes total sense, anyways this maps every zone to a given sectors,
  // so we are going to use it for that mapping service
  pathToFile = path.join(sourceBasePath, 'maps', 'xu_ep2_universe', 'sectors.xml');
  parsed = await parser.parseStringPromise(await fs.readFile(pathToFile));
  pathToFile = path.join(splitSourcePath, 'maps', 'xu_ep2_universe', 'dlc4_sectors.xml');
  splitParsed = await parser.parseStringPromise(await fs.readFile(pathToFile));
  const sectors = parsed.macros.macro = [...parsed.macros.macro, ...splitParsed.macros.macro];

  sectors.forEach(sector => {
    result.sectors[sector.name] = [];
    sector.connections.connection.forEach(connection => {
      // the SHCon gates are defined in component.xml under <component name="standardzone" class="zone">
      result.sectors[sector.name].push(connection);
    });
  });

  pathToFile = path.join(sourceBasePath, 'maps', 'xu_ep2_universe', 'zones.xml');
  parsed = await parser.parseStringPromise(await fs.readFile(pathToFile));
  pathToFile = path.join(splitSourcePath, 'maps', 'xu_ep2_universe', 'dlc4_zones.xml');
  splitParsed = await parser.parseStringPromise(await fs.readFile(pathToFile));
  const zones = parsed.macros.macro = [...parsed.macros.macro, ...splitParsed.macros.macro];
  zones.forEach(zone => result.zones[zone.name] = {...zone});

  pathToFile = path.join(sourceBasePath, 'libraries', 'god.xml');
  parsed = await parser.parseStringPromise(await fs.readFile(pathToFile));
  pathToFile = path.join(splitSourcePath, 'libraries', 'god.xml');
  splitParsed = await parser.parseStringPromise(await fs.readFile(pathToFile));

  const splitDlcStations = splitParsed.diff.add.filter(item => item.sel === '/god/stations');
  const stationsParsed = parsed.god.stations.station = [...parsed.god.stations.station, ...splitDlcStations[0].station];

  stationsParsed.forEach(station => {
    if (
      station.id.indexOf('shipyard') !== -1 ||
      station.id.indexOf('wharf') !== -1 ||
      station.id.indexOf('equipmentdock') !== -1 ||
      station.id.indexOf('tradestation') !== -1 ||
      station.type === 'tradingstation'
    ) {
      const cluster = station.location.macro.match(/cluster_(.*?)_/)[1];
      const sector = station.location.macro.match(/sector(.*?)_/)[1];
      const sectorId = `Cluster_${cluster}_Sector${sector}_macro`;
      if (!result.stations[sectorId]) result.stations[sectorId] = [];
      result.stations[sectorId].push({
        id: station.id,
        race: station.race,
        owner: station.owner,
        tags: station.type === 'tradingstation' ? 'tradestation' : station.station.select.tags.replace(/\[/, '').replace(/]/, '')
      });
    }
  });

  // read from region definitions
  // go through array result.clusters
  // for each macro.property.region.ref take and look into region definitions, grab if definition of minable items

  mapDefaults.forEach(mapDefault => {
    if (mapDefault.macro === 'xu_ep2_universe_macro') return;
    if (mapDefault.macro.indexOf('demo_') !== -1) return;
    if (mapDefault.macro.indexOf('Sector') === -1) {
      if (!result[mapDefault.macro]) result[mapDefault.macro] = {};
      result[mapDefault.macro] = {
        name: translate(mapDefault.properties.identification.name, translations, true),
        description: translate(mapDefault.properties.identification.description, translations),
        area: mapDefault.properties.area,
        sectors: []
      };
    }
    if (mapDefault.macro.indexOf('Sector') !== -1) {
      const parent = mapDefault.macro.replace(/Sector\d\d\d_/, '');
      result[parent].sectors.push({
        name: translate(mapDefault.properties.identification.name, translations, true),
        description: translate(mapDefault.properties.identification.description, translations),
        id: mapDefault.macro,
        zones: result.sectors[mapDefault.macro],
        stations: result.stations[mapDefault.macro] || null
      });
    }
  });

  delete result.clusters;
  delete result.zones;
  delete result.sectors;
  delete result.stations;

  const resultArray = Object.keys(result).map(key => result[key]);
  // we pull this manually assigned things
  // grid is 50px wide, we want to be able to go from -12 to 12 columns, so range is 24 * 50 => from 0 to 1200
  // grid is 86px tall, we want to be able to go from -6 to 6 rows, so range is 12 * 86 => from 0 to 1032
  // for every cluster, we choose define central point and then build hex around it, for sectors we either have
  // same sector as cluster, where we just use parents central point and add label or we them split, where we
  // define type of where the each sector is inside the cluster and draw smaller hexagons around it
  // for gates, we define pairs, only one pair is enough, have entry point and exit point, draw gate on both ends,
  // connect with lines. same for highways and super highways

  pathToFile = path.join(__dirname, '..', '..', 'static-files', 'x4-manual-input');

  const mapInfo = JSON.parse(await fs.readFile(path.join(pathToFile, '_sectorsMap.json'), 'utf-8'));
  const gates = JSON.parse(await fs.readFile(path.join(pathToFile, '_gates.json'), 'utf-8')).gates;
  const superHighways = JSON.parse(await fs.readFile(path.join(pathToFile, '_superHighways.json'), 'utf-8')).superHighways;
  const stations = JSON.parse(await fs.readFile(path.join(pathToFile, '_stations.json'), 'utf-8')).stations;

  Object.keys(result).map(key => {
    result[key].position = mapInfo[key].position || {x: -1000, y: -1000};
    result[key].sectorsPosition = mapInfo[key].sectorsPosition || 'singular';
    result[key].owner = mapInfo[key].owner || 'none';
  });

  let temp = {...result['Cluster_29_macro'].sectors[0]};
  result['Cluster_29_macro'].sectors.shift();
  result['Cluster_29_macro'].sectors.push(temp);

  temp = {...result['Cluster_32_macro'].sectors[0]};
  result['Cluster_32_macro'].sectors.shift();
  result['Cluster_32_macro'].sectors.push(temp);

  temp = {...result['Cluster_19_macro'].sectors[0]};
  result['Cluster_19_macro'].sectors.shift();
  result['Cluster_19_macro'].sectors.push(temp);

  temp = {...result['Cluster_21_macro'].sectors[0]};
  result['Cluster_21_macro'].sectors.shift();
  result['Cluster_21_macro'].sectors.push(temp);

  temp = {...result['Cluster_15_macro'].sectors[0]};
  result['Cluster_15_macro'].sectors.shift();
  result['Cluster_15_macro'].sectors.push(temp);

  temp = {...result['Cluster_416_macro'].sectors[0]};
  result['Cluster_416_macro'].sectors.shift();
  result['Cluster_416_macro'].sectors.push(temp);

  temp = {...result['Cluster_408_macro'].sectors[0]};
  result['Cluster_408_macro'].sectors.shift();
  result['Cluster_408_macro'].sectors.push(temp);

  temp = {...result['Cluster_423_macro'].sectors[0]};
  result['Cluster_423_macro'].sectors.shift();
  result['Cluster_423_macro'].sectors.push(temp);

  temp = {...result['Cluster_424_macro'].sectors[0]};
  result['Cluster_424_macro'].sectors.shift();
  result['Cluster_424_macro'].sectors.push(temp);

  return {
    systems: result,
    gates,
    superHighways,
    stations
  };
}
