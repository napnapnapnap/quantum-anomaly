import amarr from './amarr';
import caldari from './caldari';
import gallente from './gallente';
import minmatar from './minmatar';

function globalInfo() {
  return 'For those who will attempt this on first try. It is recommended to have ship that is cap stable with around 1000 dps tank. If your skills permit, usage of Marauders is recommended since they can easily reach more then 1000dps tank and they have immunity towards EWAR.';
}

export function getAll() {
  return {
    amarr:    amarr(),
    caldari:  caldari(),
    gallente: gallente(),
    minmatar: minmatar()
  };
}

export function getFaction(faction) {
  const epicArc = {};

  switch (faction) {
    case 'amarr':
      epicArc[faction] = amarr();
      break;
    case 'caldari':
      epicArc[faction] = caldari();
      break;
    case 'gallente':
      epicArc[faction] = gallente();
      break;
    case 'minmatar':
      epicArc[faction] = minmatar();
      break;
    default:
      epicArc[faction] = {error: 'Not found'};
  }
  
  return epicArc;
}
