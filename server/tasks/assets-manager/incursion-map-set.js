'use strict';

import Sequelize from 'sequelize';

import * as logger from '../../helpers/logger';

function saveIncursionMap(IncursionMap, mapData) {
  let promiseArray = [];
  mapData.forEach(constellation => {
    promiseArray.push(
      IncursionMap.create({
        constellationID: constellation.constellationID,
        value:           constellation
      })
    );
  });
  return Promise.all(promiseArray);
}

export default function (sequelize, mapData) {
  const IncursionMap = sequelize.define('IncursionMap', {
    constellationID: Sequelize.INTEGER,
    value:           Sequelize.JSON
  });

  return IncursionMap.sync({force: true}).then(() => {
    logger.action('IncursionMap model synced', [], 'green');
    return saveIncursionMap(IncursionMap, mapData);
  }).then(() => {
    logger.action('IncursionMap model saved', [], 'green');
  });
};
