import React from 'react';

export function addExtraMissionContext(name, type) {
  const missionType = {
    'Data Analyze and retrieve item': 'Data Analzyer',
    'Relic Analyze and retrieve item': 'Relic Analyzer',
    'Combat and Salvage': 'Salvager',
    'Epic arc choice': 'Branching mission'
  };
  return missionType[type] ?
    <span className='missions__context' title={`Required for ${name}`}> {missionType[type]}</span> : null;
}

function assumeType(name) {
  const simpleTypes = ['Frigate', 'Destroyer', 'Cruiser', 'Battlecruiser', 'Battleship'];
  let result = name;

  simpleTypes.forEach(simpleType => {
    if (name.toLowerCase().indexOf(simpleType.toLowerCase()) !== -1) result = simpleType;
  });

  return result;
}

export function getInfoByNames(shipsInfo, names) {
  let result = {
    type: 'Unknown',
    web: false,
    scram: false,
    trackingDisr: false,
    energyNeut: false,
    sensorDamp: false,
    ecm: false,
    paint: false
  };

  names.forEach(name => {
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

export function convertNameToIndex(arg) {
  return arg.replace(/ /g, '-').replace(/'/g, '').toLowerCase();
}

export function isEnemyException(name) {
  // these exist in DB under different name, assumption is that different name is listed as well so it will work out
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
    'studio-1'
  ];

  return exceptions.indexOf(name) !== -1;
}

function renderEnemyProfileInnerBlock(damage, short = false) {
  return <span key={damage} className='enemy-damage-profile__item'>
            <img className='enemy-damage-profile__icon'
                 src={`/images/eve/icons-damage/${damage.toLowerCase()}.png`}
                 title={damage}
                 alt={damage}/>
    {!short && <span className='small bold enemy-damage-profile__damage'>{damage.substring(0, 3)}</span>}
  </span>;
}

export function renderEnemyProfile(type) {
  return (
    <div className='enemy-damage-profile'>
      <h3 className='bold'>{type}</h3>
      <ul className='ul--packed'>
        <li className='enemy-damage-profile__ident'>
          <span className='enemy-damage-profile__label'>Tank against</span>
          {enemiesMap[type].incoming.map(damage => renderEnemyProfileInnerBlock(damage, false))}
        </li>
        <li className='enemy-damage-profile__ident'>
          <span className='enemy-damage-profile__label'>Use ammo for</span>
          {enemiesMap[type].outgoing.map(damage => renderEnemyProfileInnerBlock(damage, false))}
        </li>
      </ul>
    </div>
  );
}


const enemiesMap = {
  'Sansha\'s Nation': {
    incoming: ['Em', 'Thermal'],
    outgoing: ['Em', 'Thermal']
  },
  'Angel Cartel': {
    incoming: ['Explosive', 'Kinetic'],
    outgoing: ['Explosive', 'Kinetic']
  },
  'Amarr Empire': {
    incoming: ['Em', 'Thermal'],
    outgoing: ['Em', 'Thermal']
  },
  'Ammatar Mandate': {
    incoming: ['Em', 'Thermal'],
    outgoing: ['Em', 'Thermal']
  },
  'Caldari State': {
    incoming: ['Kinetic', 'Thermal'],
    outgoing: ['Kinetic', 'Thermal']
  },
  'Gallente Navy': {
    incoming: ['Kinetic', 'Thermal'],
    outgoing: ['Kinetic', 'Thermal']
  },
  'Mercenaries': {
    incoming: ['Kinetic', 'Thermal'],
    outgoing: ['Kinetic', 'Thermal']
  },
  'Mordu\'s Legion': {
    incoming: ['Kinetic', 'Thermal'],
    outgoing: ['Kinetic', 'EM']
  },
  'Minmatar Republic': {
    incoming: ['Explosive', 'Kinetic'],
    outgoing: ['Explosive', 'Kinetic']
  },
  'Rogue Drones II': {
    incoming: ['Explosive', 'Thermal'],
    outgoing: ['EM', 'Thermal']
  },
  'Serpentis': {
    incoming: ['Thermal', 'Kinetic'],
    outgoing: ['Kinetic', 'Thermal']
  },
  'Omni': {
    incoming: ['Em', 'Thermal', 'Kinetic', 'Explosive'],
    outgoing: ['Kinetic', 'Thermal']
  }
};
