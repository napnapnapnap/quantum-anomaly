'use strict';

import Sequelize from 'sequelize';
import fs from 'fs';
import util from 'util';
import path from 'path';

import * as logger from '../../../helpers/logger';
import {log} from '../../../helpers/logger';

function saveShips(Ships, ships) {
  let promiseArray = [];
  ships.forEach(ship => {
    promiseArray.push(
      Ships.create(ship)
    );
  });
  return Promise.all(promiseArray);
}

function getModel(ships) {
  logger.action('Generating ships model', [], 'green');
  let model        = {},
      mainAppModel = {},
      error        = false;

  ships.forEach(ship => {
    Object.keys(ship).forEach(attribute => {
      if (!model[attribute]) {
        if (typeof ship[attribute] === 'number') {
          model[attribute]        = Sequelize.FLOAT;
          mainAppModel[attribute] = 'FLOAT';
        } else if (typeof ship[attribute] === 'string') {
          model[attribute]        = Sequelize.STRING;
          mainAppModel[attribute] = 'STRING';
        } else if (typeof ship[attribute] === 'boolean') {
          model[attribute]        = Sequelize.BOOLEAN;
          mainAppModel[attribute] = 'BOOLEAN';
        } else if (typeof ship[attribute] === 'object') {
          model[attribute]        = Sequelize.JSON;
          mainAppModel[attribute] = 'JSON';
        } else {
          error = true;
          logger.action('Unhandled attribute type ' + attribute + ' (' + typeof ship[attribute] + ')', ['error']);
        }
      }
    });
  });
  return {
    error,
    mainAppModel,
    model
  };
}

export default function (sequelize, ships) {
  const modelShips = getModel(ships);

  if (modelShips.error) {
    logger.action('Aborting process at saving ships', ['error']);
    process.exit(1);
  } else {
    // Save this model so that main app can reuse it
    const shipsDynamicModelFilePath = path.join(__dirname, '..', '..', '..', 'models', 'dynamic-models', 'ships-dynamic-model.js');

    const data = 'export default function () { return ' + JSON.stringify(modelShips.mainAppModel) + '};';
    
    fs.closeSync(fs.openSync(shipsDynamicModelFilePath, 'w'));
    fs.writeFileSync(shipsDynamicModelFilePath, data, 'utf-8');
    logger.action('Ships model saved', [], 'green');
  }

  const Ships = sequelize.define('Ships', modelShips.model);

  return Ships.sync({force: true}).then(() => {
    logger.action('Ships model synced', [], 'green');
    return saveShips(Ships, ships);
  }).then(() => {
    logger.action('Ships model saved', [], 'green');
  });
};
