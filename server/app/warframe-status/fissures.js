import * as time from '../../helpers/time';
import * as helpers from '../../helpers';

import * as common from './common';
import nodes from './resources/nodes';

function fissureLevel(arg) {
  if (arg === 'VoidT1') return 'Lith';
  if (arg === 'VoidT2') return 'Meso';
  if (arg === 'VoidT3') return 'Neo';
  if (arg === 'VoidT4') return 'Axi';
}

export default function (arg) {
  let fissures = [];
  arg.forEach(fissure => {
    fissures.push({
      start:        fissure['Activation']['$date']['$numberLong'],
      timeStart:    time.timeFrom(fissure['Activation']['$date']['$numberLong']),
      end:          fissure['Expiry']['$date']['$numberLong'],
      timeEnd:      time.timeFrom(fissure['Expiry']['$date']['$numberLong']),
      node:         nodes(fissure['Node']),
      type:         nodes(fissure['MissionType']).value,
      sortModifier: fissure['Modifier'].replace('VoidT', ''),
      level:        fissureLevel(fissure['Modifier']),
      region:       fissure['Region']
    });
  });
  fissures.sort(helpers.dynamicSortMultiple('sortModifier', 'region'));
  return fissures;
}
