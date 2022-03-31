import {appLog, appWarning} from '../../helpers/logger';
import path from "path";
import {promises as fs} from "fs";

const sizes = [
  'extralarge',
  'large',
  'medium',
  'small'
];

export async function saveToFile(data, fileName, label, folder) {
  let destinationBasePath = path.join(__dirname, '..', '..', '..', 'static-files', 'x4');
  if (folder) destinationBasePath = path.join(destinationBasePath, folder);
  const destinationPath = path.join(destinationBasePath, `${fileName}.json`);
  appLog(`Saving ${label} at ${destinationPath}`, 'magenta');
  const file = await fs.open(destinationPath, 'w');
  file.close();
  await fs.writeFile(destinationPath, JSON.stringify(data));
}

export function getSizeFromTags(tags) {
  let size = null;
  tags.split(' ').forEach(tag => {
    if (sizes.indexOf(tag) !== -1) size = tag;
  });
  return size;
}

export function checkSizeUniformity(oldSize, newSize, name) {
  if (oldSize && oldSize !== newSize) return appWarning(`Manually check ${name}, all internals should be same size`);
}

export function getWeaponTypesFromTags(tags) {
  tags = tags.trim();
  const result = {};
  tags.split(' ').forEach(tag => {
    if (tag === 'standard') result.standard = true;
    if (tag === 'missile') result.missile = true;
    if (tag === 'arg_destroyer_01') result.capitalGun = tag;
    if (tag === 'spl_destroyer_01') result.capitalGun = tag;
    if (tag === 'par_destroyer_01') result.capitalGun = tag;
    if (tag === 'tel_destroyer_01') result.capitalGun = tag;
  })
  return result;
}
