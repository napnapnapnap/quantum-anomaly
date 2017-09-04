function humanReadableStat(stat) {
  let human = {
    shieldCapacity:      {
      label:  'Shield',
      units:  null,
      format: true
    },
    armorHP:             {
      label:  'Armor',
      units:  null,
      format: true
    },
    hp:                  {
      label:  'Hull',
      units:  null,
      format: true
    },
    cpuOutput:           {
      label:  'CPU',
      units:  'tf',
      format: true
    },
    powerOutput:         {
      label:  'PG',
      units:  'MW',
      format: true
    },
    capacitorCapacity:   {
      label:  'Capacitor',
      units:  'GJ',
      format: true
    },
    metaLevel:           {
      label: 'Tech',
      units: null
    },
    upgradeSlotsLeft:    {
      label: 'Rigs',
      units: null
    },
    hiSlots:             {
      label: 'High',
      units: 'slots'
    },
    medSlots:            {
      label: 'Mid',
      units: 'slots'
    },
    lowSlots:            {
      label: 'Low',
      units: 'slots'
    },
    upgradeCapacity:     {
      label: 'Calibration',
      units: null
    },
    turretSlotsLeft:     {
      label: 'Turrets',
      units: null
    },
    launcherSlotsLeft:   {
      label: 'Launchers',
      units: null
    },
    align:               {
      label: 'Align',
      units: 's'
    },
    maxVelocity:         {
      label:  'Speed',
      units:  'm/s',
      format: true
    },
    droneBandwidth:      {
      label: 'Drone Bandwidth',
      units: 'Mbit/sec'
    },
    droneCapacity:       {
      label: 'Drone Capacity',
      units: 'm3'
    },
    capacity:            {
      label:  'Cargo',
      units:  'm3',
      format: true
    },
    maxTargetRange:      {
      label:  'Range',
      units:  'Km',
      format: true
    },
    maxLockedTargets:    {
      label: 'Max Locks',
      units: null
    },
    scanResolution:      {
      label:  'Scan Res.',
      units:  'mm',
      format: true
    },
    warpSpeedMultiplier: {
      label: 'Warp',
      units: 'AU/s'
    },
    agility:             {
      label: 'Agility',
      units: 'x'
    },
    sensorStrength:      {
      label: 'Strength',
      units: ''
    },
    mass:                {
      label:  'Mass',
      units:  't',
      format: true
    }
  };

  return human[stat];
}

function operationSign(unit,trait) {
  let operationSign = {
    9: 'm3',
    105: '%',
    139: '+'
  };
  
  if (!operationSign[unit] && unit) {
    // console.log(trait);
  }
  
  return operationSign[unit];
}

function humanRigSize(size) {
  if (!size) size = '';
  else if (size === 1) size = ' small';
  else if (size === 2) size = ' medium';
  else if (size === 3) size = ' large';
  else if (size === 4) size = ' x-large';
  return size;
}

export {
  humanReadableStat,
  humanRigSize,
  operationSign
};
