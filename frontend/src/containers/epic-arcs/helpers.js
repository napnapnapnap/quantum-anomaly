import React from 'react';

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
    type:         'Unknown',
    web:          false,
    scram:        false,
    trackingDisr: false,
    energyNeut:   false,
    sensorDamp:   false,
    ecm:          false,
    paint:        false
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

export function renderMissionType(type, className) {
  const missionType = {
    // 'Travel':                         12052,
    // 'Combat':                         496,
    // 'Combat and retrieve item':       496,
    'Data Analyze and retrieve item':  22175,
    'Relic Analyze and retrieve item': 22177,
    'Combat and Salvage':              25861
  };

  if (missionType[type]) return <img className={className}
                                     src={`https://image.eveonline.com/Type/${missionType[type]}_32.png`}
                                     title={type}
                                     alt={type}/>;
  else return null;
}

function renderEnemyProfileInnerBlock(damage, index, short = false) {
  return <span key={index} className='enemy-damage-profile__item'>
            <img className='enemy-damage-profile__icon'
                 src={`/images/eve/icons-damage/${damage.toLowerCase()}.png`}
                 title={damage}
                 alt={damage}/>
    {!short && <span className='enemy-damage-profile__damage'>{damage}</span>}
  </span>;
}

export function renderEnemyProfile(type) {
  const enemies = {
    'Sansha\'s Nation':  {
      incoming: ['Em', 'Thermal'],
      outgoing: ['Em', 'Thermal']
    },
    'Angel Cartel':      {
      incoming: ['Explosive', 'Kinetic'],
      outgoing: ['Explosive', 'Kinetic']
    },
    'Amarr Empire':      {
      incoming: ['Em', 'Thermal'],
      outgoing: ['Em', 'Thermal']
    },
    'Ammatar Mandate':   {
      incoming: ['Em', 'Thermal'],
      outgoing: ['Em', 'Thermal']
    },
    'Caldari State':     {
      incoming: ['Kinetic', 'Thermal'],
      outgoing: ['Kinetic', 'Thermal']
    },
    'Gallente Navy':     {
      incoming: ['Kinetic', 'Thermal'],
      outgoing: ['Kinetic', 'Thermal']
    },
    'Mercenaries':       {
      incoming: ['Kinetic', 'Thermal'],
      outgoing: ['Kinetic', 'Thermal']
    },
    'Mordu\'s Legion':   {
      incoming: ['Kinetic', 'Thermal'],
      outgoing: ['Kinetic', 'EM']
    },
    'Minmatar Republic': {
      incoming: ['Explosive', 'Kinetic'],
      outgoing: ['Explosive', 'Kinetic']
    },
    'Rogue Drones II':   {
      incoming: ['Explosive', 'Thermal'],
      outgoing: ['EM', 'Thermal']
    },
    'Serpentis':         {
      incoming: ['Thermal', 'Kinetic'],
      outgoing: ['Kinetic', 'Thermal']
    },
    'Omni':              {
      incoming: ['Em', 'Thermal', 'Kinetic', 'Explosive'],
      outgoing: ['Kinetic', 'Thermal']
    }
  };
  if (type === 'Omni') return (
    <div className="enemy-damage-profile">
      <p>{type}, you're in trouble</p>
      <p>
        <span className='enemy-damage-profile__label'>Tank against</span>
        {enemies[type].incoming.map((damage, index) => renderEnemyProfileInnerBlock(damage, index, true))}
      </p>
      <p>
        <span className='enemy-damage-profile__label'>Load ammo for</span>
        {enemies[type].outgoing.map((damage, index) => renderEnemyProfileInnerBlock(damage, index, true))}
      </p>
    </div>
  );
  else if (enemies[type]) return (
    <div className="enemy-damage-profile">
      <p>{type}</p>
      <p>
        <span className='enemy-damage-profile__label'>Tank against</span>
        {enemies[type].incoming.map((damage, index) => renderEnemyProfileInnerBlock(damage, index, true))}
      </p>
      <p>
        <span className='enemy-damage-profile__label'>Load ammo for</span>
        {enemies[type].outgoing.map((damage, index) => renderEnemyProfileInnerBlock(damage, index, true))}
      </p>
    </div>
  );
}
