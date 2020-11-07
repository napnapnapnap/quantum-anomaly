import {promises as fs} from 'fs';
import xml2js from 'xml2js';
import path from 'path';
import {appLog} from '../../helpers/logger';

import {getTranslations} from './getter-translations';
import {processMacro} from './processor-macro-data';
import {processData} from './processor-data';
import {getDefaults} from './getter-defaults';
import {normalizeShip, resolveAdditionalInformation} from './processor-ship';
import {getEquipment} from './getter-equipment';

/*  NOTE: This task only runs on local machine. Even though path is being used in most places, this is still best ran
          to run on windows machine, which you probably have so that you can run the game as well, right? It expects
          that you provide path to EXTRACTED game files from EgoSoft. At least you need to extract ship data and
          translations. More info about extraction can be found here: https://www.egosoft.com/download/x4/bonus_en.php

For base game:
cd "C:\Program Files (x86)\Steam\steamapps\common\X4 Foundations"
XRCatTool.exe -in 01.cat -in 02.cat -in 03.cat -in 04.cat -in 05.cat -in 06.cat -in 07.cat -in 08.cat -in 09.cat -out "C:\X4"
pause

For split vendetta
cd "C:\Program Files (x86)\Steam\steamapps\common\X4 Foundations"
XRCatTool.exe -in extensions\ego_dlc_split\ext_01.cat -in extensions\ego_dlc_split\ext_02.cat -in extensions\ego_dlc_split\ext_03.cat -out "C:\X4\_dlc_split"
pause

For now you can just copy paste manually files from split dlc into main unpackaged folder
 */

const resourcesPath = 'C:\\X4';
const parserOptions = {mergeAttrs: true, explicitArray: false};

async function processShips(macroPath, translations, defaults, storage, shipstorage) {
  // get macro data, this is our first entry into EgoSoft ship details
  const macroParser = new xml2js.Parser(parserOptions);
  appLog(`Parsing macro data from ${macroPath}`);
  const macroData = await macroParser.parseStringPromise(await fs.readFile(macroPath));

  let ship = processMacro(macroData, translations, defaults, storage, shipstorage);

  // once you macro data, find next related file which is referenced, get useful data from there as well
  const dataParser = new xml2js.Parser(parserOptions);
  const dataFile = macroData.macros.macro.component.ref;
  let dataPath = macroPath.split('\\');
  dataPath = `${dataPath.splice(0, dataPath.length - 2).join('\\')}\\${dataFile}.xml`;
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

async function getListOfShips() {
  let listOfFiles = [];
  const sizes = ['l', 'm', 's', 'xl'];

  await sizes.reduce(async (prev, size) => {
    await prev;
    appLog(`Getting all macro file paths for ${size} size`);
    const basePath = path.join(resourcesPath, 'assets', 'units', `size_${size}`, `macros`);
    let listCurrentSize = await fs.readdir(basePath);
    listCurrentSize = listCurrentSize.filter(item => item.indexOf('ship') !== -1);
    listCurrentSize = listCurrentSize.map(item => `${basePath}\\${item}`);
    listOfFiles = listOfFiles.concat(listCurrentSize);
  }, Promise.resolve());

  return listOfFiles;
}

async function start() {
  const translations = await getTranslations(resourcesPath, parserOptions);
  appLog('Translations done', 'magenta');

  const equipment = await getEquipment(resourcesPath, parserOptions, translations);
  appLog('Equipment done', 'magenta');

  const defaults = await getDefaults(resourcesPath, parserOptions);
  appLog('Defaults done', 'magenta');

  const allMacroFiles = await getListOfShips();
  appLog(`Got list of ${allMacroFiles.length} files`, 'magenta');

  const ships = {
    ship_xl: {},
    ship_l: {},
    ship_m: {},
    ship_s: {}
  };

  let counter = 0;
  await allMacroFiles.reduce(async (prev, macroFile) => {
    await prev;
    // There are not interesting atm
    if (macroFile.indexOf('ship_tfm_l_carrier_01_a_macro') !== -1) return Promise.resolve();
    if (macroFile.indexOf('ship_gen_s_lasertower_01_a_macro') !== -1) return Promise.resolve();

    const ship = await processShips(macroFile, translations, defaults, equipment.storage, equipment.shipstorage);
    counter++;
    ships[ship.class][ship.id] = ship;
  }, Promise.resolve());

  // for simplicity now and since weekend is almost over, let's brick this over in one file
  const pathToOutput = path.join(__dirname, '..', '..', 'static-files', 'x4', '_ships.json');
  appLog(`Saving all ship data at ${pathToOutput}`, 'magenta');
  const file = await fs.open(pathToOutput, 'w');
  file.close();
  await fs.writeFile(pathToOutput, JSON.stringify(ships));
  appLog(`Processed ${counter} ships`, 'green');
}

start();
