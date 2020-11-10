import xml2js from 'xml2js';
import {promises as fs} from 'fs';
import {addDataFromMacroFile} from './ship-macro-processor';
import {addDataFromDataFile} from './ship-data-processor';
import {normalizeShip, resolveAdditionalInformation} from './ship-normalizer';
import {saveToFile} from './helpers';

async function processShips(macroPath, translations, defaults, storage, shipstorage) {
  // get macro data, this is our first entry into EgoSoft ship details
  let parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
  const macroData = await parser.parseStringPromise(await fs.readFile(macroPath));

  let ship = addDataFromMacroFile(macroData, translations, defaults, storage, shipstorage);

  // from last step we have ships most specific information, now we look at the ref file which the
  // ship shares with other ships to get more information
  parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
  const dataFile = macroData.macros.macro.component.ref;

  // unfortunately we only have the file name, but this ref file will always be one folder up
  // for some reason, split builder is referencing argon builder, since in that context we will be in split dlc
  // root folder, we need to adjust the path
  let dataPath = macroPath.split('\\');
  dataPath = `${dataPath.splice(0, dataPath.length - 2).join('\\')}\\${dataFile}.xml`;
  if (dataPath.indexOf('ego_dlc_split') !== -1 && dataPath.indexOf('ship_arg_xl_builder_01') !== -1) {
    dataPath = dataPath.replace('extensions\\ego_dlc_split\\', '');
  }
  const data = await parser.parseStringPromise(await fs.readFile(dataPath));

  ship = {...ship, ...addDataFromDataFile(data)};
  ship = {...normalizeShip(ship)};

  await saveToFile(ship, ship.id, ship.name)
  return ship;
}

export async function getShips(shipFileList, translations, defaults, equipment) {
  const ships = {ship_xl: {}, ship_l: {}, ship_m: {}, ship_s: {}};

  await shipFileList.reduce(async (prev, shipFile) => {
    await prev;

    if (shipFile.indexOf('ship_tfm_l_carrier_01_a_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_gen_s_lasertower_01_a_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_spl_s_trans_container_01_plot_01_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_spl_m_bomber_01_a_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_spl_xl_battleship_01_a_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_kha_s_fighter_01_a_macro') !== -1) return Promise.resolve();
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
