import * as helpers from '../../helpers';
import translations from './translations';
import nodes from './nodes';
import {inspect} from '../../helpers/logger';
import {models} from '../../models';

function faction(arg) {
  return helpers.capitalize(arg.replace('FC_', '').toLowerCase());
}

function level(min, max) {
  return `${min} - ${max}`;
}

function normalizeDate(arg) {
  return helpers.howLong(parseInt(arg));
}

function rewards(data) {
  const rewards = [];

  if (data.credits) {
    rewards.push(data.credits.toLocaleString('de-DE', {
      style:                 'decimal',
      minimumFractionDigits: 0
    }) + ' credits');
  }

  if (data.items) {
    data.items.forEach(item => {
      rewards.push(translations(item));
    });
  }

  if (data['countedItems']) {
    data['countedItems'].forEach(item => {
      rewards.push(`${item['ItemCount']} x ${translations(item['ItemType'])}`);
    });
  }

  return rewards;
}

function planetName(arg) {
  let planetRegexp = /\((.*?)\)/g,
      planet       = planetRegexp.exec(arg.value)[1];
  return planet;
}

function normalizeData(data) {
  const result = {
    alerts:    [],
    invasions: {},
    sortie:    {}
  };

  data['Alerts'].forEach(alert => {
    result.alerts.push({
      start:    normalizeDate(alert['Activation']['$date']['$numberLong']),
      end:      normalizeDate(alert['Expiry']['$date']['$numberLong']),
      faction:  faction(alert['MissionInfo']['faction']),
      location: nodes(alert['MissionInfo']['location']).value,
      level:    level(alert['MissionInfo']['minEnemyLevel'], alert['MissionInfo']['maxEnemyLevel']),
      type:     translations(alert['MissionInfo']['missionType']),
      rewards:  rewards(alert['MissionInfo']['missionReward'])
    });
  });


  data['Invasions'].forEach(invasion => {
    if (!invasion['Completed']) {
      let translatedGoal  = invasion['Goal'] * 2,
          translatedCount = invasion['Count'] + invasion['Goal'],
          status          = translatedCount / translatedGoal,
          node            = nodes(invasion['Node']),
          planet          = planetName(node);

      if (status < 0) status = 0;
      else if (status > 1) status = 1;
      status = 100 - (status * 100);

      if (!result.invasions[planet]) result.invasions[planet] = [];
      node.value = node.value.replace(/ \(.*?\)/g, '');

      result.invasions[planet].push({
        start:           normalizeDate(invasion['Activation']['$date']['$numberLong']),
        node:            node,
        planet:          planet,
        status:          status.toFixed(2),
        description:     translations(invasion['LocTag']),
        attacker:        faction(invasion['AttackerMissionInfo']['faction']),
        defender:        faction(invasion['DefenderMissionInfo']['faction']),
        attackerRewards: rewards(invasion['AttackerReward']),
        defenderRewards: rewards(invasion['DefenderReward'])
      });
    }
  });

  result.sortie = {
    end:      normalizeDate(data['Sorties'][0]['Expiry']['$date']['$numberLong']),
    missions: []
  };

  const sortieMissions = data['Sorties'][0]['Variants'];
  sortieMissions.forEach(sortie => {
    result.sortie.missions.push({
      type: translations(sortie['missionType']),
      node: nodes(sortie['node']),
      effect: translations(sortie['modifierType'])
    });
  });


  return result;
}

export default function () {
  return models.WarframeStatus.get().then((data) => {
    return normalizeData(data);
  });
};
