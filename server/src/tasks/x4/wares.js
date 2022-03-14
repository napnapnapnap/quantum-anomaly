import xml2js from 'xml2js';
import path from 'path';
import {promises as fs} from 'fs';

export async function getWares(resourcesPath) {
  let parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
  const pathToFile = path.join(resourcesPath, 'libraries', 'wares.xml');
  const parsed = await parser.parseStringPromise(await fs.readFile(pathToFile));

  parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
  const pathToSplitWare = path.join(resourcesPath, 'extensions', 'ego_dlc_split', 'libraries', 'wares.xml');
  const pathToTerranWare = path.join(resourcesPath, 'extensions', 'ego_dlc_terran', 'libraries', 'wares.xml');
  const pathToPirateWare = path.join(resourcesPath, 'extensions', 'ego_dlc_pirate', 'libraries', 'wares.xml');
  const splitParsed = await parser.parseStringPromise(await fs.readFile(pathToSplitWare));
  const terranParsed = await parser.parseStringPromise(await fs.readFile(pathToTerranWare));
  const pirateParsed = await parser.parseStringPromise(await fs.readFile(pathToPirateWare));

  // this is diff file, so it will have add array and each item will be selection where to add and other key of what
  // to add, later we can do this dynamically, but for now let's just hardcode it since there is only 2 items
  splitParsed.diff.add.forEach(item => {
    if (item.sel === '/wares/production') parsed.wares.production.method = parsed.wares.production.method.concat(item.method);
    else if (item.sel === '/wares') parsed.wares.ware = parsed.wares.ware.concat(item.ware);
  });

  terranParsed.diff.add.forEach(item => {
    if (item.sel === '/wares/production') parsed.wares.production.method = parsed.wares.production.method.concat(item.method);
    else if (item.sel === '/wares') parsed.wares.ware = parsed.wares.ware.concat(item.ware);
  });

  pirateParsed.diff.add.forEach(item => {
    if (item.sel === '/wares/production') parsed.wares.production.method = parsed.wares.production.method.concat(item.method);
    else if (item.sel === '/wares') parsed.wares.ware = parsed.wares.ware.concat(item.ware);
  });

  // this is array and lookup is a pain, so let's convert this to object where key is the id, that way we can just access
  // information any time by knowing id
  const objectifiedWares = {};
  parsed.wares.ware.forEach(ware => {
    objectifiedWares[ware.id] = ware;
  })

  parsed.wares.ware = objectifiedWares;

  return parsed;
}
