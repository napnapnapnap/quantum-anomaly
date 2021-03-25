import {checkSizeUniformity, getSizeFromTags} from './helpers';

function countArmaments(armament) {
  const result = {extralarge: 0, large: 0, medium: 0, small: 0};
  armament.forEach(item => {
    result[item.size] += item.quantity;
  });
  return result;
}

export function normalizeShip(ship, wares) {
  if (ship.groups) {
    Object.keys(ship.groups).forEach(groupKey => {
      // Here we will have things that we can easily transpose into usable properties without having
      // to do lookups in other files (we prepared this data from either macro or data file in units folder)
      // Assumption is that we will never have anything other than shields mixing up with other types of
      // equipment. If that does happen... well.. assumption is mother of all fups...

      // Each group is in form of something like groupKey: [{name, tags}, ...]
      // This is far from optimal at this point, but we will do 2 loops, first one to double check the type
      // and then second one to actually map it properly
      let isEngineGroup = false;
      let isTurretGroup = false;
      ship.groups[groupKey].forEach(group => {
        const tags = group.tags;
        if (new RegExp('\\b(engine)\\b', 'i').test(tags)) isEngineGroup = true;
        if (new RegExp('\\b(turret)\\b', 'i').test(tags)) isTurretGroup = true;
      });
      if (isEngineGroup && isTurretGroup) throw new Error('Well... mother of all fups, ship normalizer found group with multiple types');
      if (!isEngineGroup && !isTurretGroup) throw new Error('Empty groups, or not engine/turret type, double check source');

      // for engines we already have placeholder object from s/m ships, since each ship has one
      // engine group and we could create object ahead of time, so we are going to add info
      // there and attach shields as object property if needed
      if (isEngineGroup) {
        ship.groups[groupKey].forEach(group => {
          const tags = group.tags;
          if (new RegExp('\\b(engine)\\b', 'i').test(tags)) {
            ship.engines.quantity++;
            const size = getSizeFromTags(tags);
            checkSizeUniformity(ship.engines.size, size, ship.name);
            ship.engines.size = size;
          }
          if (new RegExp('\\b(shield)\\b', 'i').test(tags)) {
            if (!ship.engines.shields) ship.engines.shields = {quantity: 0, size: null};
            ship.engines.shields.quantity++;
            const size = getSizeFromTags(tags);
            checkSizeUniformity(ship.engines.shields.size, size, ship.name);
            ship.engines.shields.size = size;
          }
        });
      }

      // for turrets we only have empty array, s/m ships already have this filled, so we create same
      // structure here as needed and just push into the same array that s/m ships would have it
      if (isTurretGroup) {
        const turretGroup = {
          quantity: 0,
          size: null,
          standard: false,
          missile: false
        };
        ship.groups[groupKey].forEach(group => {
          const tags = group.tags;
          if (new RegExp('\\b(turret)\\b', 'i').test(tags)) {
            turretGroup.quantity++;
            const size = getSizeFromTags(tags);
            checkSizeUniformity(turretGroup.size, size, ship.name);
            turretGroup.size = size;
            if (new RegExp('\\b(standard)\\b', 'i').test(tags)) turretGroup.standard = true;
            if (new RegExp('\\b(missile)\\b', 'i').test(tags)) turretGroup.missile = true;
          }
          if (new RegExp('\\b(shield)\\b', 'i').test(tags)) {
            if (!turretGroup.shields) turretGroup.shields = {quantity: 0, size: null};
            turretGroup.shields.quantity++;
            const size = getSizeFromTags(tags);
            checkSizeUniformity(turretGroup.shields.size, size, ship.name);
            turretGroup.shields.size = size;
          }
        });
        ship.turrets.push(turretGroup);
      }
    });
  }

  const ware = wares.wares.ware[ship.id.replace('_macro', '')];
  ship.price = ware ? ware.price : 'N/A';
  ship.production = ware ? ware.production : 'N/A';

  let manufacturer = null;
  if (Array.isArray(ware.owner)) {
    ware.owner.forEach(item => {
      if (!manufacturer && item.faction !== 'buccaneers' && item.faction !== 'court' && item.faction !== 'hatikvah'  && item.faction !== 'alliance') manufacturer = item.faction;
    });
  } else {
    manufacturer = ware.owner.faction;
  }
  ship.manufacturer = manufacturer;

  if (ship.storage.capacityType === 'container liquid solid') ship.storage.capacityType = 'Any type';

  delete ship.groups;
  // this is some of the things that might be usefull later, but for now we get rid of it and we can comment out
  // next line in future in case there is something interesting still there
  delete ship.unknownThings;

  //    armaments: {weapons: {large: 0, medium: 0, small: 0}, turrets: {large: 0, medium: 0, small: 0}},
  ship.armaments.turrets = countArmaments(ship.turrets);
  ship.armaments.weapons = countArmaments(ship.weapons);

  return ship;
}
