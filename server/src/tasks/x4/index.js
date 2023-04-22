import { promises as fs } from 'fs';
import path from 'path';
import xml2js from 'xml2js';

import { appLog } from '../../helpers/logger';
import { getDefaults } from './defaults';
import { getEquipment } from './equipment';
import { saveToFile } from './helpers';
import { getMap } from './map';
import { getModifications } from './modifications';
import { getShips } from './ships';
import { getTerraforming } from './terraforming';
import { getTranslations } from './translations';
import { getWares } from './wares';

const sourceBasePath = 'C:\\X4';
const sourcify = (arg) => path.join(sourceBasePath, `${arg}.xml`);

// type [macros/components]
async function composeIndexTree(type, dlc = null) {
  let sourceIndexBasePath = sourceBasePath;
  if (dlc === 'split') sourceIndexBasePath = path.join(sourceIndexBasePath, 'extensions', 'ego_dlc_split');
  if (dlc === 'terran') sourceIndexBasePath = path.join(sourceIndexBasePath, 'extensions', 'ego_dlc_terran');
  if (dlc === 'pirate') sourceIndexBasePath = path.join(sourceIndexBasePath, 'extensions', 'ego_dlc_pirate');
  if (dlc === 'boron') sourceIndexBasePath = path.join(sourceIndexBasePath, 'extensions', 'ego_dlc_boron');
  sourceIndexBasePath = path.join(sourceIndexBasePath, 'index');

  let sourceFilePath;
  if (type === 'macros') sourceFilePath = path.join(sourceIndexBasePath, 'macros.xml');
  else if (type === 'components') sourceFilePath = path.join(sourceIndexBasePath, 'components.xml');

  const parser = new xml2js.Parser({ mergeAttrs: true, explicitArray: false });
  let parsedIndex = await parser.parseStringPromise(await fs.readFile(sourceFilePath));

  let index = {};
  parsedIndex.index.entry.forEach((entry) => {
    index[entry.name] = entry.value;
  });

  return index;
}

async function start() {
  const translations = await getTranslations(sourceBasePath);
  // await saveToFile(translations, '_translations', 'translations');

  const wares = await getWares(sourceBasePath, translations);
  await saveToFile(wares, '_wares', 'wares');

  const terraform = await getTerraforming(sourceBasePath, translations, wares.wares);
  // await saveToFile(terraform, '_terraform', 'terraform');

  const mapInformation = await getMap(sourceBasePath, translations);
  await saveToFile(mapInformation, '_map', 'map');

  return;

  const modifications = await getModifications(sourceBasePath, wares, translations);
  await saveToFile(modifications, '_modifications', 'modifications');

  let macrosIndex = await composeIndexTree('macros');
  macrosIndex = {
    ...macrosIndex,
    ...(await composeIndexTree('macros', 'split')),
  };
  macrosIndex = {
    ...macrosIndex,
    ...(await composeIndexTree('macros', 'terran')),
  };
  macrosIndex = {
    ...macrosIndex,
    ...(await composeIndexTree('macros', 'pirate')),
  };
  macrosIndex = {
    ...macrosIndex,
    ...(await composeIndexTree('macros', 'boron')),
  };
  await saveToFile(macrosIndex, '_macros-index', 'macro index');

  let componentsIndex = await composeIndexTree('components');
  componentsIndex = {
    ...componentsIndex,
    ...(await composeIndexTree('components', 'split')),
  };
  componentsIndex = {
    ...componentsIndex,
    ...(await composeIndexTree('components', 'terran')),
  };
  componentsIndex = {
    ...componentsIndex,
    ...(await composeIndexTree('components', 'pirate')),
  };
  componentsIndex = {
    ...componentsIndex,
    ...(await composeIndexTree('components', 'boron')),
  };
  await saveToFile(componentsIndex, '_components-index', 'components index');

  let shipPaths = [];
  const fileLists = {
    engine: [],
    thruster: [],
    shield: [],
    shipstorage: [],
    storage: [],
    weapon: [],
    turret: [],
    bullet: [],
    dockarea: [],
  };

  Object.keys(macrosIndex).forEach((key) => {
    const isXs = key.indexOf('xs') !== -1;
    const isStation = key.indexOf('station_') !== -1;

    if (key.indexOf('test_') !== -1 || key.indexOf('legacy') !== -1) return;
    if (key.indexOf('ship_') === 0 && !isXs) shipPaths.push(sourcify(macrosIndex[key]));

    if (key.indexOf('engine_') === 0 && !isXs) fileLists.engine.push(sourcify(macrosIndex[key]));
    if (key.indexOf('thruster_') === 0 && !isXs) fileLists.thruster.push(sourcify(macrosIndex[key]));
    if (key.indexOf('shield_') === 0 && !isXs) fileLists.shield.push(sourcify(macrosIndex[key]));
    if (key.indexOf('shipstorage_') === 0 && !isXs) fileLists.shipstorage.push(sourcify(macrosIndex[key]));
    if (key.indexOf('storage_') === 0 && !isXs) fileLists.storage.push(sourcify(macrosIndex[key]));
    if (key.indexOf('weapon_') === 0 && !isXs) fileLists.weapon.push(sourcify(macrosIndex[key]));
    if (key.indexOf('turret_') === 0 && !isXs) fileLists.turret.push(sourcify(macrosIndex[key]));
    if (key.indexOf('bullet_') === 0 && !isXs) fileLists.bullet.push(sourcify(macrosIndex[key]));
    if (key.indexOf('dockarea_') === 0 && !isStation && !isXs) fileLists.dockarea.push(sourcify(macrosIndex[key]));
  });

  shipPaths.sort();
  shipPaths = [...new Set(shipPaths)];
  Object.keys(fileLists).forEach((key) => (fileLists[key] = [...new Set(fileLists[key].sort())]));

  const equipment = await getEquipment(fileLists, translations);
  await saveToFile(
    {
      extralarge: equipment.extralarge,
      large: equipment.large,
      medium: equipment.medium,
      small: equipment.small,
    },
    '_equipment',
    'equipment'
  );

  const defaults = await getDefaults(sourceBasePath);
  await saveToFile(defaults, '_defaults', 'defaults');

  // [TODO]: Optimize ship processing
  const ships = await getShips(shipPaths, translations, defaults, equipment, wares);
  await saveToFile(ships, '_ships', 'ships');

  const totalNumberOfShips = Object.keys(ships).length;
  appLog(`Finished generating ${totalNumberOfShips} ships`, 'green');
}

start();
