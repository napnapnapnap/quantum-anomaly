import { EveEpicArcInfo } from '../../redux/eve/epic-arcs';
import { EveNpcs } from '../../redux/eve/npcs';

export function convertNameToIndex(arg: string) {
  return arg.replace(/ /g, '-').replace(/'/g, '').toLowerCase();
}

function assumeType(name: string) {
  const simpleTypes = ['Frigate', 'Destroyer', 'Cruiser', 'Battlecruiser', 'Battleship'];
  let result = name;

  simpleTypes.forEach((simpleType) => {
    if (name.toLowerCase().indexOf(simpleType.toLowerCase()) !== -1) result = simpleType;
  });

  return result;
}

export function getInfoByNames(shipsInfo: any, names: string[]) {
  let result = {
    type: 'Unknown',
    web: false,
    scram: false,
    trackingDisr: false,
    energyNeut: false,
    sensorDamp: false,
    ecm: false,
    paint: false,
  };

  names.forEach((name) => {
    let index = convertNameToIndex(name);
    if (shipsInfo[index]) {
      result.type = shipsInfo[index].flags.type;
      result.web = shipsInfo[index].flags.web;
      result.scram = shipsInfo[index].flags.scram;
      result.trackingDisr = shipsInfo[index].flags.trackingDisr;
      result.energyNeut = shipsInfo[index].flags.energyNeut;
      result.sensorDamp = shipsInfo[index].flags.sensorDamp;
      result.ecm = shipsInfo[index].flags.ecm;
      result.paint = shipsInfo[index].flags.paint;
    } else {
      result.type = assumeType(name);
    }
  });

  return result;
}

export function getAllNpcNames(epicArc: EveEpicArcInfo | undefined, eveNpcs: EveNpcs) {
  const enemies: string[] = [];

  // gather all the npc names in all missions in this epic arc
  epicArc?.missions?.forEach((mission) => {
    mission.pockets?.forEach((pocket) =>
      pocket.forEach((wave) =>
        wave.enemies.forEach((enemy) =>
          enemy.names.forEach((name) => {
            const indexName: string = convertNameToIndex(name);
            // if the enemy is not already in the store and if he is not in the list of enemies, add him there
            if (!eveNpcs[indexName] && enemies.indexOf(indexName) === -1 && !isEnemyException(indexName))
              enemies.push(indexName);
          })
        )
      )
    );
  });

  return enemies;
}

export const enemiesMap: { [key: string]: { incoming: string[]; outgoing: string[] } } = {
  "Sansha's Nation": {
    incoming: ['Em', 'Thermal'],
    outgoing: ['Em', 'Thermal'],
  },
  'Angel Cartel': {
    incoming: ['Explosive', 'Kinetic'],
    outgoing: ['Explosive', 'Kinetic'],
  },
  'Amarr Empire': {
    incoming: ['Em', 'Thermal'],
    outgoing: ['Em', 'Thermal'],
  },
  'Ammatar Mandate': {
    incoming: ['Em', 'Thermal'],
    outgoing: ['Em', 'Thermal'],
  },
  'Caldari State': {
    incoming: ['Kinetic', 'Thermal'],
    outgoing: ['Kinetic', 'Thermal'],
  },
  'Gallente Navy': {
    incoming: ['Kinetic', 'Thermal'],
    outgoing: ['Kinetic', 'Thermal'],
  },
  Mercenaries: {
    incoming: ['Kinetic', 'Thermal'],
    outgoing: ['Kinetic', 'Thermal'],
  },
  "Mordu's Legion": {
    incoming: ['Kinetic', 'Thermal'],
    outgoing: ['Kinetic', 'EM'],
  },
  'Minmatar Republic': {
    incoming: ['Explosive', 'Kinetic'],
    outgoing: ['Explosive', 'Kinetic'],
  },
  'Rogue Drones II': {
    incoming: ['Explosive', 'Thermal'],
    outgoing: ['EM', 'Thermal'],
  },
  Serpentis: {
    incoming: ['Thermal', 'Kinetic'],
    outgoing: ['Kinetic', 'Thermal'],
  },
  Omni: {
    incoming: ['Em', 'Thermal', 'Kinetic', 'Explosive'],
    outgoing: ['Kinetic', 'Thermal'],
  },
};

export function isEnemyException(name: string) {
  // these exist in DB under different name, we assume that alternative enemies in the same pocket will provide some
  // information instead
  const exceptions = [
    'ailon-boufin',
    'audalle-roire',
    'container',
    'the-pator-six',
    'pator-six-delegate',
    'pator-six-elite-frigate',
    'pator-six-elite-cruiser',
    'pator-six-elite-battleship',
    'acceleration-gate',
    'consumption-junkies',
    'sinful-saints',
    'lustadores',
    'intaki-settlement-control-tower',
    'acceleration-gate---the-hub',
    'acceleration-gate---the-alley',
    'carry-on-freighter',
    'freighter',
    'carry-on-courier',
    'carry-on-industrial',
    'industrial',
    'carry-on-hub',
    'studio-1',
  ];

  return exceptions.indexOf(name) !== -1;
}
