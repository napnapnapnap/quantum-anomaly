import path from 'path';
import {promises as fs} from 'fs';
import {appLog, inspect} from '../../helpers/logger';
import xml2js from 'xml2js';
import {translate} from './getter-translations';

const getContent = async (paths, parserOptions, type, translations) => {
  const result = {};

  await paths.reduce(async (prev, filePath) => {
    await prev;
    let size = null;

    if (filePath.indexOf('_s_') !== -1) size = 'small';
    else if (filePath.indexOf('_m_') !== -1) size = 'medium';
    else if (filePath.indexOf('_xl_') !== -1) size = 'extralarge';
    else if (filePath.indexOf('_l_') !== -1) size = 'large';
    else return Promise.resolve();

    const parser = new xml2js.Parser(parserOptions);
    const parsed = await parser.parseStringPromise(await fs.readFile(filePath));

    if (type === 'engine' || type === 'thruster') {
      if (!result[size]) result[size] = {};
      const item = {};
      const data = parsed.macros.macro;
      const properties = parsed.macros.macro.properties;
      item.id = data.component.ref;
      item.name = translate(properties.identification.name, translations, true);
      item.basename = translate(properties.identification.basename, translations, true);
      item.shortname = translate(properties.identification.shortname, translations, true);
      item.description = translate(properties.identification.shortname, translations, true);
      item.thrust = properties.thrust;
      item.mk = properties.identification.mk;
      item.class = type;
      if (type === 'engine') {
        item.makerrace = properties.identification.makerrace;
        item.boost = properties.boost;
        item.travel = properties.travel;
      }
      result[size][item.id] = item;
    } else if (type === 'shield') {
      if (!result[size]) result[size] = {};
      const item = {};
      const data = parsed.macros.macro;
      const properties = parsed.macros.macro.properties;
      // for some reason all shields are referring to Argon ones... if this gets fixed, expected should be following:
      // item.id = data.component.ref;
      item.id = data.name.replace('_macro', '');
      item.name = translate(properties.identification.name, translations, true);
      item.basename = translate(properties.identification.basename, translations, true);
      item.shortname = translate(properties.identification.shortname, translations, true);
      item.description = translate(properties.identification.shortname, translations, true);
      item.recharge = {
        max: properties.recharge.max,
        rate: properties.recharge.rate,
        delay: properties.recharge.delay
      };
      item.hull = {
        max: properties.hull.max,
        treshold: properties.hull.treshold,
        delay: properties.recharge.delay
      };
      item.mk = properties.identification.mk;
      item.class = type;
      item.makerrace = properties.identification.makerrace;
      result[size][item.id] = item;
    } else if (type === 'storage') {
      const properties = parsed.macros.macro.properties;
      result[parsed.macros.macro.name] = {
        cargo: properties.cargo.max,
        type: properties.cargo.tags.trim()
      };
    } else if (type === 'shipstorage') {
      const properties = parsed.macros.macro.properties;
      result[parsed.macros.macro.name] = {
        name: translate(properties.identification.name, translations, true),
        capacity: properties.dock.capacity,
        type: properties.docksize.tags.trim()
      };
    }
  }, Promise.resolve());

  return result;
};

const mergeResults = (destination, source) => ({
  large: {...destination.large, ...source.large},
  medium: {...destination.medium, ...source.medium},
  small: {...destination.small, ...source.small},
  extralarge: {...destination.extralarge, ...source.extralarge}
});

const getStorageFilePaths = async (resourcesPath) => {
  appLog(`Getting all macro file paths for storage`);
  let appendix; // because ofc not all storage is in same place, we will keep appending stuff
  let currentPath = path.join(resourcesPath, 'assets', 'props', 'StorageModules', `macros`);
  let storageModulesFileList = await fs.readdir(currentPath);
  let storageFileList = storageModulesFileList.filter(file => file.indexOf('storage_') !== -1).map(file => path.join(currentPath, file));

  currentPath = path.join(resourcesPath, 'assets', 'units', 'size_l', `macros`);
  storageModulesFileList = await fs.readdir(currentPath);
  appendix = storageModulesFileList.filter(file => file.indexOf('storage_') !== -1).map(file => path.join(currentPath, file));
  storageFileList = storageFileList.concat(appendix);

  currentPath = path.join(resourcesPath, 'assets', 'units', 'size_m', `macros`);
  storageModulesFileList = await fs.readdir(currentPath);
  appendix = storageModulesFileList.filter(file => file.indexOf('storage_') !== -1).map(file => path.join(currentPath, file));
  storageFileList = storageFileList.concat(appendix);

  currentPath = path.join(resourcesPath, 'assets', 'units', 'size_s', `macros`);
  storageModulesFileList = await fs.readdir(currentPath);
  appendix = storageModulesFileList.filter(file => file.indexOf('storage_') !== -1).map(file => path.join(currentPath, file));
  storageFileList = storageFileList.concat(appendix);

  currentPath = path.join(resourcesPath, 'assets', 'units', 'size_xl', `macros`);
  storageModulesFileList = await fs.readdir(currentPath);
  appendix = storageModulesFileList.filter(file => file.indexOf('storage_') !== -1).map(file => path.join(currentPath, file));
  storageFileList = storageFileList.concat(appendix);

  return storageFileList;
};

export async function getEquipment(resourcesPath, parserOptions, translations) {
  let currentPath;
  let results = {large: {}, medium: {}, small: {}, extralarge: {}};

  appLog(`Getting all macro file paths for engines and thrusters`);
  currentPath = path.join(resourcesPath, 'assets', 'props', 'Engines', `macros`);
  let engineThrusterFileList = await fs.readdir(currentPath);
  const engineFileList = engineThrusterFileList.filter(file => file.indexOf('engine') !== -1).map(file => path.join(currentPath, file));
  const thrusterFileList = engineThrusterFileList.filter(file => file.indexOf('thruster') !== -1).map(file => path.join(currentPath, file));
  const engines = await getContent(engineFileList, parserOptions, 'engine', translations);
  results = mergeResults(results, engines);
  const thrusters = await getContent(thrusterFileList, parserOptions, 'thruster', translations);
  results = mergeResults(results, thrusters);

  currentPath = path.join(resourcesPath, 'assets', 'props', 'SurfaceElements', `macros`);
  let shieldShipStorageFileList = await fs.readdir(currentPath);
  const shieldFileList = shieldShipStorageFileList.filter(file => file.indexOf('shield') !== -1).map(file => path.join(currentPath, file));
  const shipStorageFileList = shieldShipStorageFileList.filter(file => file.indexOf('shipstorage') !== -1).map(file => path.join(currentPath, file));
  const shields = await getContent(shieldFileList, parserOptions, 'shield', translations);
  results = mergeResults(results, shields);
  const shipstorage = await getContent(shipStorageFileList, parserOptions, 'shipstorage', translations);

  const pathToOutput = path.join(__dirname, '..', '..', 'static-files', 'x4', '_equipment.json');
  const file = await fs.open(pathToOutput, 'w');
  await file.close();
  await fs.writeFile(pathToOutput, JSON.stringify(results));

  const storageFileList = await getStorageFilePaths(resourcesPath);
  const storage = await getContent(storageFileList, parserOptions, 'storage', translations);

  const pathToStorageOutput = path.join(__dirname, '..', '..', 'static-files', 'x4', '_storage.json');
  const fileStorage = await fs.open(pathToStorageOutput, 'w');
  await fileStorage.close();
  await fs.writeFile(pathToStorageOutput, JSON.stringify(storage));

  const pathToShipstorageOutput = path.join(__dirname, '..', '..', 'static-files', 'x4', '_shipstorage.json');
  const fileShipstorage = await fs.open(pathToShipstorageOutput, 'w');
  await fileShipstorage.close();
  await fs.writeFile(pathToShipstorageOutput, JSON.stringify(shipstorage));

  return {...results, storage: storage, shipstorage: shipstorage};
}
