import xml2js from 'xml2js';
import path from 'path';
import {promises as fs} from 'fs';
import {appLog} from '../../helpers/logger';

const getterDefaults = ['ship_xl', 'ship_l', 'ship_m', 'ship_s'];

export async function getDefaults(resourcesPath, parserOptions) {
  const parser = new xml2js.Parser(parserOptions);
  const pathToFile = path.join(resourcesPath, 'libraries', 'defaults.xml');
  const pathToOutput = path.join(__dirname, '..', '..', 'static-files', 'x4', '_defaults.json');
  let result = {};

  appLog(`Reading EgoSoft XML file defaults from ${pathToFile}`);
  const parsed = await parser.parseStringPromise(await fs.readFile(pathToFile));

  appLog(`Converting EgoSoft XML file into JSON`);
  parsed.defaults.dataset.forEach(dataset => {
    if (getterDefaults.indexOf(dataset.class) !== -1)
      result[dataset.class] = {
        radarRange: dataset.properties.radar.range,
        docksize: dataset.properties.docksize.tag,
        storage: {
          countermeasure: dataset.properties.storage.countermeasure,
          deployable: dataset.properties.storage.deployable
        }
      };
  });

  appLog(`Saving JSON defaults to ${pathToOutput}`);
  const file = await fs.open(pathToOutput, 'w');
  await file.close();
  await fs.writeFile(pathToOutput, JSON.stringify(result));
  return result;
}
