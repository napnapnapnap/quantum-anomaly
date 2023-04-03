import { checkSizeUniformity, getSizeFromTags, getWeaponTypesFromTags } from './helpers';

export function addDataFromDataFile(data) {
  const connections = data.components.component.connections.connection;
  const ship = {
    turrets: [],
    weapons: [],
    shields: { size: null, quantity: 0 },
    engines: { size: null, quantity: 0 },
    specialExit: false,
    groups: {}, // temporary storage for sorting groups, later we remove this
    unknownThings: [], // temporary storage for things we don't know what are yet
  };

  connections.forEach((connection) => {
    let { name, group, tags } = connection;
    name = name.trim();
    if (group) group = group.trim();
    if (tags) tags = tags.trim();
    const isTransporter = group && group.indexOf('transporter') !== -1;
    const isNpcRelated = tags.indexOf('npc') !== -1;
    const isJustSomePart = tags.indexOf('part') !== -1;
    const isControlSurface =
      group &&
      (group.indexOf('pilotcontrol') !== -1 ||
        group.indexOf('gunnercontrol') !== -1 ||
        group.indexOf('navigationcontrol') !== -1);

    if (isTransporter) ship.specialExit = true;

    // idea is that this picks up groups, which are mostly on capital ships since they are either guns + shields
    // or turrets + shields or engines + shields, we will later check these one by one to translate properly to
    // same format.
    if (group && !(isTransporter || isNpcRelated || isJustSomePart || isControlSurface)) {
      if (!ship.groups[group]) ship.groups[group] = [];
      ship.groups[group].push({ name, tags });
    }
    // this pickup turrets on subcaps
    else if (new RegExp('\\b(turret)\\b', 'i').test(tags)) {
      ship.turrets.push({ quantity: 1, size: getSizeFromTags(tags) });
    }
    // and weapons on subcaps (actually most likely caps as well)
    else if (new RegExp('\\b(weapon)\\b', 'i').test(tags)) {
      ship.weapons.push({ quantity: 1, size: getSizeFromTags(tags), ...getWeaponTypesFromTags(tags) });
    }
    // shields which don't have groups are main shield generators on capitals and subcapitals, we only need count
    else if (new RegExp('\\b(shield)\\b', 'i').test(tags) && !group) {
      const size = getSizeFromTags(tags);
      checkSizeUniformity(ship.shields.size, size, name);
      ship.shields.size = size;
      ship.shields.quantity++;
    }
    // engines which don't have groups on capitals and subcapitals, we only need count
    else if (new RegExp('\\b(engine)\\b', 'i').test(tags) && !group) {
      const size = getSizeFromTags(tags);
      checkSizeUniformity(ship.engines.size, size, name);
      ship.engines.size = size;
      ship.engines.quantity++;
    }
    // everything else we don't know what it is atm
    else {
      if (new RegExp('\\b(countermeasures)\\b', 'i').test(tags)) return;
      if (new RegExp('\\b(part)\\b', 'i').test(tags)) return;
      if (new RegExp('\\b(impactindicator)\\b', 'i').test(tags)) return;
      if (isNpcRelated) return;
      if (isTransporter) return;
      delete connection.offset;
      ship.unknownThings.push(connection);
    }
  });

  return ship;
}
