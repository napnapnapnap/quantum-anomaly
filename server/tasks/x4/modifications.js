import xml2js from 'xml2js';
import path from 'path';
import {promises as fs} from 'fs';

export async function getModifications(sourceBasePath) {
  const parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
  const pathToFile = path.join(sourceBasePath, 'libraries', 'equipmentmods.xml');
  const parsed = await parser.parseStringPromise(await fs.readFile(pathToFile));


  return parsed;
}
