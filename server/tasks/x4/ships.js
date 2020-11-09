import xml2js from 'xml2js';
import path from 'path';
import {promises as fs} from 'fs';
import {processMacro} from './processor-macro-data';
import {processData} from './processor-data';
import {normalizeShip, resolveAdditionalInformation} from './processor-ship';
import {appLog} from '../../helpers/logger';

async function processShips(macroPath, translations, defaults, storage, shipstorage) {
  // get macro data, this is our first entry into EgoSoft ship details
  const macroParser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
  appLog(`Parsing macro data from ${macroPath}`);
  const macroData = await macroParser.parseStringPromise(await fs.readFile(macroPath));

  let ship = processMacro(macroData, translations, defaults, storage, shipstorage);

  // once you macro data, find next related file which is referenced, get useful data from there as well
  const dataParser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
  const dataFile = macroData.macros.macro.component.ref;
  let dataPath = macroPath.split('\\');
  dataPath = `${dataPath.splice(0, dataPath.length - 2).join('\\')}\\${dataFile}.xml`;

  // for some reason, split builder is referencing argon builder as base... and since that one is only in base
  // game, the path needs to be adjusted
  if (dataPath.indexOf('extensions\\ego_dlc_split\\assets\\units\\size_xl\\ship_arg_xl_builder_01') !== -1)
    dataPath = dataPath.replace('extensions\\ego_dlc_split\\', '');

  appLog(`Parsing additional information from ${dataPath}`);
  const data = await dataParser.parseStringPromise(await fs.readFile(dataPath));

  ship = {...ship, ...processData(data)};
  ship = {...normalizeShip(ship)};
  ship = {...await resolveAdditionalInformation(ship)};

  // at this point we either have most data consumable, or we have some things almost ready to use
  // so let's look at the specifics that still remain and adjust those into properly usable properties

  // at the end, save this as json file
  const pathToOutput = path.join(__dirname, '..', '..', 'static-files', 'x4', `${ship.id}.json`);
  appLog(`Saving data for ${ship.name} at ${pathToOutput}`, 'magenta');
  const file = await fs.open(pathToOutput, 'w');
  file.close();
  await fs.writeFile(pathToOutput, JSON.stringify(ship));

  return ship;
}

export async function getShips(shipFileList, translations, defaults, equipment) {
  const ships = {ship_xl: {}, ship_l: {}, ship_m: {}, ship_s: {}};

  await shipFileList.reduce(async (prev, shipFile) => {
    await prev;

    if (shipFile.indexOf('ship_tfm_l_carrier_01_a_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_gen_s_lasertower_01_a_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('miningdrone') !== -1) return Promise.resolve();
    if (shipFile.indexOf('fightingdrone') !== -1) return Promise.resolve();
    if (shipFile.indexOf('tfm') !== -1) return Promise.resolve();

    const ship = await processShips(shipFile, translations, defaults, equipment.storage, equipment.shipstorage);
    ships[ship.class][ship.id] = ship;
  }, Promise.resolve());

  let orderedShip = {ship_xl: {}, ship_l: {}, ship_m: {}, ship_s: {}};
  Object.keys(ships.ship_xl).sort().forEach(key => orderedShip.ship_xl[key] = ships.ship_xl[key]);
  Object.keys(ships.ship_l).sort().forEach(key => orderedShip.ship_l[key] = ships.ship_l[key]);
  Object.keys(ships.ship_m).sort().forEach(key => orderedShip.ship_m[key] = ships.ship_m[key]);
  Object.keys(ships.ship_s).sort().forEach(key => orderedShip.ship_s[key] = ships.ship_s[key]);

  return orderedShip;
}
