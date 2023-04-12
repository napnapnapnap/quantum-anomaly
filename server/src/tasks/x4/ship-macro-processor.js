import { translate, translateRecursive } from './translations';

const getRace = (name) => {
  if (name.indexOf('ship_arg') !== -1) return 'arg';
  else if (name.indexOf('ship_par') !== -1) return 'par';
  else if (name.indexOf('ship_spl') !== -1) return 'spl';
  else if (name.indexOf('ship_tel') !== -1) return 'tel';
  else if (name.indexOf('ship_xen') !== -1) return 'xen';
  else if (name.indexOf('ship_kha') !== -1) return 'kha';
  else if (name.indexOf('ship_ter') !== -1) return 'ter';
  else if (name.indexOf('ship_yak') !== -1) return 'yak';
  else if (name.indexOf('ship_atf') !== -1) return 'atf';
  else if (name.indexOf('ship_bor') !== -1) return 'bor';
  else if (name.indexOf('ship_gen_s_fighter_01') !== -1) return 'arg';
  else return 'unk';
};

export function addDataFromMacroFile(data, translations, defaults, storage, shipstorage) {
  const properties = data.macros.macro.properties;
  const connections = data.macros.macro.connections.connection;
  const classOfShip = data.macros.macro.class;

  const ship = {
    id: data.macros.macro.name,
    class: classOfShip,
    race: getRace(data.macros.macro.name),
    name: translate(properties.identification.name, translations, true).replace(/\\/g, ''),
    basename: translateRecursive(properties.identification.basename, translations),
    description: translateRecursive(properties.identification.description, translations)
      .replace(/\(same(.*?)\)/g, '')
      .replace(/\(.* same as .*?\)/g, '')
      .replace('(The E-model ...)', ''),
    shortvariation: translateRecursive(properties.identification.shortvariation, translations),
    variation: translateRecursive(properties.identification.variation, translations),
    type: properties.ship.type,
    radarRange: defaults[classOfShip].radarRange,
    docksize: defaults[classOfShip].docksize,
    hull: parseFloat(properties.hull.max),
    shield: { max: 0, rate: 0, delay: 0 },
    speed: { forward: 0, acceleration: 0, boost: 0, travel: 0, pitch: 0, roll: 0, yaw: 0 },
    armaments: { weapons: { large: 0, medium: 0, small: 0 }, turrets: { large: 0, medium: 0, small: 0 } },
    storage: {
      unit: properties.storage ? parseFloat(properties.storage.unit) : 0,
      missile: properties.storage ? parseFloat(properties.storage.missile) : 0,
      people: parseFloat(properties.people.capacity),
      countermeasure: parseFloat(defaults[classOfShip].storage.countermeasure),
      deployable: parseFloat(defaults[classOfShip].storage.deployable),
      capacity: 0,
      capacityType: null,
    },
    mass: parseFloat(properties.physics.mass),
    inertia: {
      pitch: parseFloat(properties.physics.inertia.pitch),
      yaw: parseFloat(properties.physics.inertia.yaw),
      roll: parseFloat(properties.physics.inertia.roll),
    },
    drag: {
      forward: parseFloat(properties.physics.drag.forward),
      reverse: parseFloat(properties.physics.drag.reverse),
      horizontal: parseFloat(properties.physics.drag.horizontal),
      vertical: parseFloat(properties.physics.drag.vertical),
      pitch: parseFloat(properties.physics.drag.pitch),
      yaw: parseFloat(properties.physics.drag.yaw),
      roll: parseFloat(properties.physics.drag.roll),
    },
    thrusters: {
      size: properties.thruster.tags,
    },
    shipstorage: {
      dock_m: 0,
      dock_s: 0,
    },
  };

  Array.isArray(connections) &&
    connections.forEach((connection) => {
      if (connection.ref.indexOf('_shipstorage') !== -1) {
        if (connection.macro.ref.indexOf('xs') !== -1) return;
        const shipstorageType = shipstorage[connection.macro.ref].type;
        const shipstorageCapacity = parseInt(shipstorage[connection.macro.ref].capacity, 10);
        ship.shipstorage[shipstorageType] += shipstorageCapacity;
      }
      if (connection.ref.indexOf('_storage') !== -1) {
        ship.storage.capacity = parseFloat(storage[connection.macro.ref].cargo);
        ship.storage.capacityType = storage[connection.macro.ref].type;
      }
    });

  // some things don't have information and we don't want to show this text then at all
  if (ship.description && ship.description.indexOf('No information available') !== -1) ship.description = null;

  // possible variations to filter later on frontend [VA/ST/RD] and self introduced BV for everything else
  if (!ship.shortvariation) {
    if (ship.name.indexOf('Vanguard') !== -1) ship.shortvariation = 'VA';
    else if (ship.name.indexOf('Sentinel') !== -1) ship.shortvariation = 'ST';
    else ship.shortvariation = 'BV';
  }

  if (!ship.variation) ship.variation = 'Base Variation';

  ship.shortvariation = ship.shortvariation.replace('\\(Gas\\) VA', 'VA').replace('\\(Gas\\) ST', 'ST');
  ship.variation = ship.variation.replace('\\(Gas\\)', '').replace('\\(Gas\\)', '').trim();
  ship.shortvariation = ship.shortvariation.replace('\\(Mineral\\) VA', 'VA').replace('\\(Mineral\\) ST', 'ST');
  ship.variation = ship.variation.replace('\\(Mineral\\)', '').replace('\\(Mineral\\)', '').trim();

  // if we still don't have shortvariation, set it as BV
  if (['RD', 'VA', 'ST', 'BV'].indexOf(ship.shortvariation) === -1) {
    ship.shortvariation = 'BV';
    ship.variation = 'Base Variation';
  }

  if (ship.id === 'ship_arg_m_bomber_02_a_macro') ship.type = 'gunboat';

  return ship;
}
