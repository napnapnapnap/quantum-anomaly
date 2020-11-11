import {promises as fs} from 'fs';
import xml2js from 'xml2js';
import {translate} from './translations';
import {inspect} from '../../helpers/logger';

const applyBulletInfo = (bullets, bullet) => {
  bullet = bullet.trim().replace('_macro', '');
  return {
    properties: bullets[bullet].bullet,
    damage: bullets[bullet].damage,
    reload: bullets[bullet].reload,
    system: bullets[bullet].system
  };
};

const getContent = async (paths, type, translations, bullets) => {
  const result = {};

  await paths.reduce(async (prev, filePath) => {
    // before we start file operations, let's wait for previous step to finish
    await prev;

    if (filePath.indexOf('legacy') !== -1) return Promise.resolve();
    let size = null;
    if (filePath.indexOf('_s_') !== -1) size = 'small';
    else if (filePath.indexOf('_m_') !== -1) size = 'medium';
    else if (filePath.indexOf('_xl_') !== -1) size = 'extralarge';
    else if (filePath.indexOf('_l_') !== -1) size = 'large';
    else return Promise.resolve();

    const parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
    const parsed = await parser.parseStringPromise(await fs.readFile(filePath));

    const data = parsed.macros.macro;
    const properties = parsed.macros.macro.properties;

    if (!result[size]) result[size] = {};

    // for some reason all shields are referring to Argon ones...
    // also sometimes engines are also missing
    // if this gets fixed in EgoSoft file, then change id to data.component.ref
    // in meantime we can abuse name and just remove _macro part

    // [TODO]: Missiles don't have bullets
    if (type === 'turret' && data.class !== 'missileturret') {
      result[size][data.name.replace('_macro', '')] = {
        name: translate(properties.identification.name, translations, true),
        makerrace: properties.identification.makerrace,
        mk: properties.identification.mk,
        class: data.class,
        bullet: applyBulletInfo(bullets, properties.bullet.class),
        rotation: {
          speed: properties.rotationspeed.max
        },
        reload: {
          rate: properties.reload.rate,
          time: properties.reload.time
        },
        hull: properties.hull.max
      };
    } else if (type === 'turret' && data.class === 'missileturret') {
      result[size][data.name.replace('_macro', '')] = {
        name: translate(properties.identification.name, translations, true),
        makerrace: properties.identification.makerrace,
        mk: properties.identification.mk,
        class: data.class,
        //bullet: applyBulletInfo(bullets, properties.bullet.class),
        rotation: {
          speed: properties.rotationspeed.max
        },
        ammunition: properties.ammunition.tags.trim().split(' '),
        storage: properties.storage.capacity,
        hull: properties.hull.max
      };
    } else if (type === 'weapon' && data.class !== 'missilelauncher') {
      result[size][data.name.replace('_macro', '')] = {
        name: translate(properties.identification.name, translations, true),
        heat: properties.heat,
        mk: properties.identification.mk,
        class: data.class,
        bullet: applyBulletInfo(bullets, properties.bullet.class),
        rotation: {
          speed: properties.rotationspeed.max,
          acceleration: properties.rotationacceleration ? properties.rotationacceleration.max : 'N/A'
        },
        hull: properties.hull.max
      };
    } else if (type === 'weapon' && data.class === 'missilelauncher') {
      result[size][data.name.replace('_macro', '')] = {
        name: translate(properties.identification.name, translations, true),
        mk: properties.identification.mk,
        class: data.class,
        // bullet: applyBulletInfo(bullets, properties.bullet.class),
        ammunition: properties.ammunition.tags.trim().split(' '),
        hull: properties.hull.max
      };
    } else if (type === 'engine') {
      if (data.name.replace('_macro', '').indexOf('xen') !== -1) return;
      if (data.name.replace('_macro', '').indexOf('kha') !== -1) return;
      if (data.name.replace('_macro', '').indexOf('tfm') !== -1) return;

      result[size][data.name.replace('_macro', '')] = {
        id: data.name.replace('_macro', ''),
        name: translate(properties.identification.name, translations, true).replace('APL', 'SPL'),
        mk: properties.identification.mk,
        class: type,
        makerrace: properties.identification.makerrace,
        thrust: properties.thrust,
        boost: properties.boost,
        travel: properties.travel
      };
    } else if (type === 'thruster') {
      result[size][data.name.replace('_macro', '')] = {
        id: data.name.replace('_macro', ''),
        name: translate(properties.identification.name, translations, true),
        mk: properties.identification.mk,
        class: type,
        thrust: properties.thrust
      };
    } else if (type === 'shield') {
      if (data.name.replace('_macro', '').indexOf('m_standard_01') !== -1) return;
      if (data.name.replace('_macro', '').indexOf('xen') !== -1) return;
      if (data.name.replace('_macro', '').indexOf('kha') !== -1) return;

      result[size][data.name.replace('_macro', '')] = {
        id: data.name.replace('_macro', ''),
        name: translate(properties.identification.name, translations, true),
        description: translate(properties.identification.shortname, translations, true),
        hull: properties.hull.max,
        mk: properties.identification.mk,
        class: type,
        makerrace: properties.identification.makerrace,
        recharge: {
          max: properties.recharge.max,
          rate: properties.recharge.rate,
          delay: properties.recharge.delay
        }
      };
    } else if (type === 'bullet') {
      result[data.name.replace('_macro', '')] = {
        class: data.class,
        ammunition: properties.ammunition,
        bullet: properties.bullet,
        heat: properties.heat,
        damage: properties.damage,
        reload: properties.reload,
        system: properties.weapon ? properties.weapon.system : null
      };
    } else if (type === 'storage') {
      result[parsed.macros.macro.name] = {
        cargo: properties.cargo.max,
        type: properties.cargo.tags.trim()
      };
    } else if (type === 'shipstorage') {
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
  extralarge: {...destination.extralarge, ...source.extralarge},
  large: {...destination.large, ...source.large},
  medium: {...destination.medium, ...source.medium},
  small: {...destination.small, ...source.small}
});

export async function getEquipment(fileLists, translations) {
  let results = {extralarge: {}, large: {}, medium: {}, small: {}};

  // get all bullet info here... don't merge into results, but just plug into weapons
  const bullets = await getContent(fileLists.bullet, 'bullet', translations);

  results = mergeResults(results, await getContent(fileLists.engine, 'engine', translations));
  results = mergeResults(results, await getContent(fileLists.thruster, 'thruster', translations));
  results = mergeResults(results, await getContent(fileLists.shield, 'shield', translations));
  results = mergeResults(results, await getContent(fileLists.weapon, 'weapon', translations, bullets));
  results = mergeResults(results, await getContent(fileLists.turret, 'turret', translations, bullets));

  // we treat next ones differently since we don't care about it later at runtime, we just need it once
  // during this scripts as reference to inject numbers

  let orderedResults = {extralarge: {}, large: {}, medium: {}, small: {}};
  Object.keys(results.extralarge).sort().forEach(key => orderedResults.extralarge[key] = results.extralarge[key]);
  Object.keys(results.large).sort().forEach(key => orderedResults.large[key] = results.large[key]);
  Object.keys(results.medium).sort().forEach(key => orderedResults.medium[key] = results.medium[key]);
  Object.keys(results.small).sort().forEach(key => orderedResults.small[key] = results.small[key]);

  results = {
    ...orderedResults,
    shipstorage: await getContent(fileLists.shipstorage, 'shipstorage', translations),
    storage: await getContent(fileLists.storage, 'storage', translations)
  };

  return results;
}
