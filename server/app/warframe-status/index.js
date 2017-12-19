import * as helpers from '../../helpers';
import translations from './translations';
import {inspect} from '../../helpers/logger';
import {models} from '../../models';

function faction(arg) {
  return helpers.capitalize(arg.replace('FC_', '').toLowerCase());
}

function level(min, max) {
  return `${min}-${max}`;
}

function normalizeDate(arg) {
  return helpers.howLong(parseInt(arg));
}

function rewards(data) {
  const rewards = [
    data.credits.toLocaleString('de-DE', {
      style:                 'decimal',
      minimumFractionDigits: 0
    }) + ' credits'
  ];

  if (data.items) {
    data.items.forEach(item => {
      rewards.push(translations(item));
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

  //inspect(result);
  return result;
}

export default function () {
  return models.WarframeStatus.get().then((data) => {
    return normalizeData(data);
  });
};
