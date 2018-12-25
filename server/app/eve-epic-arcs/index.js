import amarr from './amarr';
import caldari from './caldari';
import gallente from './gallente';
import minmatar from './minmatar';

function globalInfo() {
  return 'For those who will attempt this on first try. It is recommended to have ship that is cap stable with around 1000 dps tank. If your skills permit, usage of Marauders is recommended since they can easily reach more then 1000dps tank and they have immunity towards EWAR.';
}

export function getAll() {
  const epicArcs = {
    amarr:    amarr(),
    caldari:  caldari(),
    gallente: gallente(),
    minmatar: minmatar()
  };

  epicArcs.amarr.global    = globalInfo();
  epicArcs.caldari.global  = globalInfo();
  epicArcs.gallente.global = globalInfo();
  epicArcs.minmatar.global = globalInfo();

  return epicArcs;
}

export function getFaction(faction) {
  let epicArc = {};
  
  epicArc[faction] = {};
  if (faction === 'amarr') epicArc[faction]= amarr();
  else if (faction === 'caldari') epicArc[faction] = caldari();
  else if (faction === 'gallente') epicArc[faction] = gallente();
  else if (faction === 'minmatar') epicArc[faction] = minmatar();

  epicArc[faction].global = globalInfo();

  return epicArc;
}
