'use strict';

import amarr from './_amarr';
import caldari from './_caldari';
import gallente from './_gallente';
import minmatar from './_minmatar';

import {increaseCounter} from '../../models/counters';

function globalInfo () {
  return 'For those who will attempt this on first try. It is recommended to have ship that is cap stable with around 1000 dps tank. If your skills permit, usage of Marauders is recommended since they can easily reach more then 1000dps tank and they have immunity towards EWAR.'
}

export default function () {
  const epicArcs   = {};
  epicArcs.amarr   = amarr();
  epicArcs.caldari = caldari();
  epicArcs.gallente = gallente();
  epicArcs.minmatar = minmatar();
  
  epicArcs.amarr.global = globalInfo();
  epicArcs.caldari.global = globalInfo();
  epicArcs.gallente.global = globalInfo();
  epicArcs.minmatar.global = globalInfo();

  increaseCounter('epic-arcs');

  return epicArcs;
};
