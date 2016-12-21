'use strict';

import Sequelize from 'sequelize';

import * as logger from '../../../helpers/logger';

function saveShips(Ships, ships) {
  let promiseArray = [];
  ships.forEach(ship => {
    promiseArray.push(
      Ships.create({
        typeID: ship.typeID,
        value:  ship
      })
    );
  });
  return Promise.all(promiseArray);
}

export default function (sequelize, ships) {
  const Ships = sequelize.define('Ships', {
    typeID: Sequelize.INTEGER,
    value:  Sequelize.JSON,
  });
  
  return Ships.sync({force: true}).then(() => {
    logger.action('Ships model synced', [], 'green');
    return saveShips(Ships, ships);
  }).then(() => {
    logger.action('Ships model saved', [], 'green');
  });
};
