import xml2js from 'xml2js';
import path from 'path';
import {appLog} from '../../helpers/logger';
import {promises as fs} from 'fs';

export async function getTranslations(resourcesPath, parserOptions) {
  const translationParser = {...parserOptions, explicitArray: true};
  const parser = new xml2js.Parser(translationParser);
  const pathToFile = path.join(resourcesPath, 't', '0001-l044.xml');
  const pathToOutput = path.join(__dirname, '..', '..', 'static-files', 'x4', '_translations.json');

  appLog(`Reading EgoSoft XML file translations from ${pathToFile}`);
  const parsed = await parser.parseStringPromise(await fs.readFile(pathToFile));
  const pages = {};

  appLog(`Converting EgoSoft XML file into JSON`);
  parsed.language.page.forEach(page => {
    const translations = {};
    page.t.forEach(translation => translations[translation.id] = translation['_']);

    pages[page.id] = {title: page.title[0], translations: translations};
  });

  // since we need to keep reference to outerID, but we want to throw out extra stuff
  const result = {
    20006: pages[20006],
    20101: pages[20101],
    20106: pages[20106],
    20107: pages[20107],
    20104: pages[20104],
    20111: pages[20111]
  };

  appLog(`Saving JSON translations to ${pathToOutput}`);
  const file = await fs.open(pathToOutput, 'w');
  await file.close();
  await fs.writeFile(pathToOutput, JSON.stringify(result));
  return result;
}

export function translate(id, translations, isName = false, isRef = false) {
  if (!id) {
    return null;
  }
  const ids = id.replace(/{/, '').replace(/}/, '').split(',');
  const pageId = ids[0].trim();
  const translationId = ids[1].trim();
  let result = translations[pageId].translations[translationId];
  if (result && isName && result.match(/\((.*)\)/)) result = result.match(/\((.*)\)/).pop();
  if (isRef) result = translate(result, translations);
  return result;
}
