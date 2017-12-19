import * as WarframeStatus from '../../models/warframe-status';
import * as helpers from '../../helpers';
import translations from './translations';
import {inspect} from '../../helpers/logger';

function faction(arg) {
  return helpers.capitalize(arg.replace('FC_', '').toLowerCase());
}

function level(min, max) {
  return `${min}-${max}`;
}

function normalizeDate(arg) {
  //return moment.unix(arg/1000).format("YY/MM/DD HH:mm:ss");
  return helpers.howLong(parseInt(arg));
}

function rewards(data) {
  const rewards = [
    data.credits + ' credits'
  ];

  if (data.items) {
    data.items.forEach(item => {
      if (item.indexOf('Upgrades/Mods') !== -1) {
        const modStringArray = item.split('/');
        rewards.push(modStringArray[modStringArray.length - 1].replace('Mod', ''));
      } else {
        rewards.push(translations(item));
      }
    });
  }

  return rewards;
}

function normalizeData(data) {
  const result = {
    alerts: []
  };
  data['Alerts'].forEach(alert => {
    result.alerts.push({
      start:   normalizeDate(alert['Activation']['$date']['$numberLong']),
      end:     normalizeDate(alert['Expiry']['$date']['$numberLong']),
      faction: faction(alert['MissionInfo']['faction']),
      level:   level(alert['MissionInfo']['minEnemyLevel'], alert['MissionInfo']['maxEnemyLevel']),
      type:    translations(alert['MissionInfo']['missionType']),
      rewards: rewards(alert['MissionInfo']['missionReward'])
    });
  });

  inspect(result);
  return result;
}

export default function () {
  return WarframeStatus.getWarframeStatus().then((data) => {
    return normalizeData(data);
  });
};
