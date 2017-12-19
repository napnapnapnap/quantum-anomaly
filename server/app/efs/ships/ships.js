import * as Ships from '../../../models/ships';
import * as Skills from '../../../models/skills';

import {increaseCounter} from '../../../models/counters';

export default function () {
  let shipsFormatted       = {'Special Ships': {}},
      shipsFormattedSorted = {},
      shipsCollection;

  return Ships.getAllShips().then(ships => {
    shipsCollection = ships;
    return Skills.getSkillsIdNamesPair();
  }).then(skills => {
    shipsCollection.forEach(ship => {
      if (ship.traits) {
        Object.keys(ship.traits).forEach(key => {
          let skillName = skills[key] || 'Ship Bonus';

          ship.traits[skillName] = ship.traits[key];
          ship.traits[skillName].forEach(trait => {
            delete trait.traitID;
            delete trait.typeID;
            delete trait.skillID;
          });
          delete ship.traits[key];
          ship.traits[skillName].sort((a, b) => (a.bonusText > b.bonusText) ? 1 : ((b.bonusText > a.bonusText) ? -1 : 0));
        });
      }
      if (ship.special) {
        if (!shipsFormatted['Special Ships'][ship.raceName]) {
          shipsFormatted['Special Ships'][ship.raceName] = [];
        }
        shipsFormatted['Special Ships'][ship.raceName].push(ship);
      } else {
        if (!shipsFormatted[ship.groupName]) {
          shipsFormatted[ship.groupName] = {};
        }
        if (!shipsFormatted[ship.groupName][ship.raceName]) {
          shipsFormatted[ship.groupName][ship.raceName] = [];
        }
        ship.typeName = ship.typeName.replace('Edition', '');
        shipsFormatted[ship.groupName][ship.raceName].push(ship);
      }
    });
    Object.keys(shipsFormatted).sort().forEach(key => {
      shipsFormattedSorted[key] = shipsFormatted[key];
      delete shipsFormatted[key];
    });
    increaseCounter('overview-ships');
    return shipsFormattedSorted;
  });
};
