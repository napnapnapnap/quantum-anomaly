import { promises as fs } from 'fs';
import path from 'path';
import xml2js from 'xml2js';

const defaults = ['ship_xl', 'ship_l', 'ship_m', 'ship_s'];

export async function getDefaults(sourceBasePath) {
  const parser = new xml2js.Parser({ mergeAttrs: true, explicitArray: false });
  const pathToFile = path.join(sourceBasePath, 'libraries', 'defaults.xml');
  const parsed = await parser.parseStringPromise(await fs.readFile(pathToFile));

  let result = {};
  parsed.defaults.dataset.forEach((dataset) => {
    if (defaults.indexOf(dataset.class) !== -1)
      result[dataset.class] = {
        radarRange: dataset.properties.radar.range,
        docksize: dataset.properties.docksize.tag,
        storage: {
          countermeasure: dataset.properties.storage.countermeasure,
          deployable: dataset.properties.storage.deployable,
        },
      };
  });

  return result;
}
