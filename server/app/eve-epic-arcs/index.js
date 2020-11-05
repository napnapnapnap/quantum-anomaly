import {data as amarrData} from './amarr';
import {data as caldariData} from './caldari';
import {data as gallenteData} from './gallente';
import {data as minmatarData} from './minmatar';

function augmentInfoData(info) {
  Object.keys(info).forEach(faction => {
    info[faction].missionIndex = {};
    getEpicArc(faction)[faction].forEach((mission, index) =>
      info[faction].missionIndex[mission.name.replace(/ /g, '-').toLowerCase()] = index
    );
  });
  return info;
}

export function getInfo() {
  return augmentInfoData({
    amarr: amarrData.info,
    caldari: caldariData.info,
    gallente: gallenteData.info,
    minmatar: minmatarData.info
  });
}

export function getEpicArc(faction) {
  switch (faction) {
    case 'amarr':
      return {amarr: amarrData.missions};
    case 'caldari':
      return {caldari: caldariData.missions};
    case 'gallente':
      return {gallente: gallenteData.missions};
    case 'minmatar':
      return {minmatar: minmatarData.missions};
    default:
      return {error: 'Not found'};
  }
}
