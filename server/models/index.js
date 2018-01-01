import Sequelize from 'sequelize';
import * as helpers from '../helpers';

import * as logger from '../helpers/logger';
import sessionsModel from './sessions';
import usersModel from './users';
import shipsModel from './ships';
import skillsModel from './skills';
import countersModel from './counters';
import incursionMapModel from './incursion-map';
import incursionsModel from './incursions';
import warframeStatusModel from './warframe-status';

function overwriteEntry(error, response, Model) {
  if (error) return;

  Model.create({
    data: JSON.parse(response.body)
  }).then(function (data) {
    Model.destroy({
      where: {
        id: {
          [Sequelize.Op.ne]: data.get('id')
        }
      }
    });
  });
}

function updateEntry(Model, modelName, timer) {
  const urls = {
    incursions:     'https://crest.eveonline.com/incursions/',
    warframeStatus: 'http://content.warframe.com/dynamic/worldState.php'
  };

  helpers.request({url: urls[modelName]}, overwriteEntry, Model);
  setInterval(function () {
    helpers.request({url: urls[modelName]}, overwriteEntry, Model);
  }, timer * 60 * 1000);
  logger.init(`Model ${modelName} started autoupdate every ${timer} minutes`, 'gray');
}

let models = {};

export default function (sequelize, silent) {
  models = {
    Sessions:       sessionsModel(sequelize),
    Users:          usersModel(sequelize),
    Ships:          shipsModel(sequelize),
    Skills:         skillsModel(sequelize),
    Counters:       countersModel(sequelize),
    IncursionMaps:  incursionMapModel(sequelize),
    Incursions:     incursionsModel(sequelize),
    WarframeStatus: warframeStatusModel(sequelize)
  };

  return sequelize.sync().then(() => {
    if (!silent) logger.init('Database models synced');
    updateEntry(models.Incursions, 'incursions', 15);
    updateEntry(models.WarframeStatus, 'warframeStatus', 5);
    models.Counters.setDefaults();
    return models;
  });
};

export {models};