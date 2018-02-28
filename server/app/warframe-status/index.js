import * as helpers from '../../helpers';
import translations from './translations';
import nodes from './nodes';
import modifiers from './modifiers';
import {inspect} from '../../helpers/logger';
import {models} from '../../models';

function faction(arg) {
  return helpers.capitalize(arg.replace('FC_', '').toLowerCase());
}

function level(min, max) {
  return `${min} - ${max}`;
}

function normalizeDate(arg) {
  return helpers.formatTime(parseInt(arg));
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

function nodeName(arg) {
  let planet = ` (${planetName(arg)})`;
  return arg.value.replace(planet, '');
}

function planetName(arg) {
  let planetRegexp = /\((.*?)\)/g;
  return planetRegexp.exec(arg.value)[1];
}

function cetusTime(cetusInfo) {
  const end = cetusInfo['Expiry']['$date']['$numberLong'],
        now = new Date();

  let remainingTime    = (end - now.getTime()),
      remainingMinutes = Math.floor(remainingTime / 1000 / 60),
      dayNightStatus   = 'day',
      bountyRefresh;

  // cycle is 2 and half hours, night time is for the last 50 minutes of cycle
  if (remainingMinutes < 50) {
    dayNightStatus   = 'night';
    remainingMinutes = normalizeDate(end);
  }
  else remainingMinutes = normalizeDate(end - (1000 * 60 * 50));
  bountyRefresh = normalizeDate(end);

  return {
    remainingMinutes: remainingMinutes,
    bountyRefresh:    bountyRefresh,
    status:           dayNightStatus
  };
}

function normalizeData(data) {
  const result = {
    alerts:    [],
    invasions: {},
    sortie:    {}
  };

  let now = new Date();

  data['Alerts'].forEach(alert => {
    let node = nodeName(nodes(alert['MissionInfo']['location']));
    let start = alert['Activation']['$date']['$numberLong'];
    result.alerts.push({
      id:       `${node} -> ${alert['Expiry']['$date']['$numberLong']}`,
      start:    normalizeDate(alert['Activation']['$date']['$numberLong']),
      end:      normalizeDate(alert['Expiry']['$date']['$numberLong']),
      faction:  faction(alert['MissionInfo']['faction']),
      location: nodes(alert['MissionInfo']['location']).value,
      level:    level(alert['MissionInfo']['minEnemyLevel'], alert['MissionInfo']['maxEnemyLevel']),
      type:     nodes(alert['MissionInfo']['missionType']).value,
      rewards:  rewards(alert['MissionInfo']['missionReward']),
      future:   alert['Activation']['$date']['$numberLong'] > now.getTime()
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

  const sortieMissions = data['Sorties'][0]['Variants'];
  result.sortie        = {
    end:      normalizeDate(data['Sorties'][0]['Expiry']['$date']['$numberLong']),
    missions: [],
    enemy:    nodes(data['Sorties'][0]['Boss']).faction,
    boss:     nodes(data['Sorties'][0]['Boss']).name
  };

  sortieMissions.forEach((sortie, index) => {
    let level;
    if (index === 0) level = '40-60';
    else if (index === 1) level = '60-80';
    else level = '80-100';
    result.sortie.missions.push({
      type:   nodes(sortie['missionType']).value,
      node:   nodes(sortie['node']),
      effect: modifiers(sortie['modifierType']),
      level:  level
    });
  });

  // experimental cetus stuff
  const syndicate = data['SyndicateMissions'];
  syndicate.forEach(cetusInfo => {
    if (cetusInfo['Tag'] === 'CetusSyndicate') {
      result.cetus = {
        start: normalizeDate(cetusInfo['Activation']['$date']['$numberLong']),
        end:   Math.floor(parseInt(cetusInfo['Expiry']['$date']['$numberLong']) / 1000 / 60 / 60 / 60 / 60),
        ...cetusTime(cetusInfo)
      };
    }
  });

  return result;
}

export default function () {
  return models.WarframeStatus.get().then((data) => {
    return normalizeData(data);
  });
};
