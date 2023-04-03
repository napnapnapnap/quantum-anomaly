import { promises as fs } from 'fs';
import xml2js from 'xml2js';

import { saveToFile } from './helpers';
import { addDataFromDataFile } from './ship-data-processor';
import { addDataFromMacroFile } from './ship-macro-processor';
import { normalizeShip } from './ship-normalizer';

async function processShips(macroPath, translations, defaults, storage, shipstorage, wares) {
  // get macro data, this is our first entry into EgoSoft ship details
  let parser = new xml2js.Parser({ mergeAttrs: true, explicitArray: false });
  const macroData = await parser.parseStringPromise(await fs.readFile(macroPath));

  let ship = addDataFromMacroFile(macroData, translations, defaults, storage, shipstorage);

  // from last step we have ships most specific information, now we look at the ref file which the
  // ship shares with other ships to get more information
  parser = new xml2js.Parser({ mergeAttrs: true, explicitArray: false });
  const dataFile = macroData.macros.macro.component.ref;

  // unfortunately we only have the file name, but this ref file will always be one folder up
  // for some reason, split builder is referencing argon builder, since in that context we will be in split dlc
  // root folder, we need to adjust the path
  let dataPath = macroPath.split('\\');
  dataPath = `${dataPath.splice(0, dataPath.length - 2).join('\\')}\\${dataFile}.xml`;
  if (dataPath.indexOf('ego_dlc_split') !== -1 && dataPath.indexOf('ship_arg_xl_builder_01') !== -1) {
    dataPath = dataPath.replace('extensions\\ego_dlc_split\\', '');
  }
  if (dataPath.indexOf('ego_dlc_terran') !== -1 && dataPath.indexOf('ship_arg_xl_builder_01') !== -1) {
    dataPath = dataPath.replace('extensions\\ego_dlc_terran\\', '');
  }
  if (dataPath.indexOf('ego_dlc_pirate') !== -1 && dataPath.indexOf('ship_arg_xl_builder_01') !== -1) {
    dataPath = dataPath.replace('extensions\\ego_dlc_pirate\\', '');
  }
  const data = await parser.parseStringPromise(await fs.readFile(dataPath));

  ship = { ...ship, ...addDataFromDataFile(data) };
  ship = { ...normalizeShip(ship, wares) };

  await saveToFile(ship, ship.id, ship.name);
  return ship;
}

export async function getShips(shipFileList, translations, defaults, equipment, wares) {
  const ships = {};

  await shipFileList.reduce(async (prev, shipFile) => {
    await prev;

    if (shipFile.indexOf('ship_tfm_l_carrier_01_a_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_gen_s_lasertower_01_a_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_spl_s_trans_container_01_plot_01_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_spl_m_bomber_01_a_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_spl_xl_battleship_01_a_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_kha_s_fighter_01_a_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_gen_m_transdrone_container_01_a_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_gen_m_transdrone_container_02_a_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_gen_s_transdrone_container_01_a_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_gen_s_transdrone_container_02_a_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_ter_l_trans_container_01_landmark_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_ter_l_research_01_a_macro') !== -1) return Promise.resolve();
    if (shipFile.indexOf('miningdrone') !== -1) return Promise.resolve();
    if (shipFile.indexOf('fightingdrone') !== -1) return Promise.resolve();
    if (shipFile.indexOf('tfm') !== -1) return Promise.resolve();
    if (shipFile.indexOf('ship_pir_l_scavenger_01_a_storyhighcapacity_macro') !== -1) return Promise.resolve();

    const ship = await processShips(shipFile, translations, defaults, equipment.storage, equipment.shipstorage, wares);
    ships[ship.id] = ship;
  }, Promise.resolve());

  return ships;
}
