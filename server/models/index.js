import Sequelize from 'sequelize';
import * as helpers from '../helpers';

import * as logger from '../helpers/logger';
import * as sessionsModel from './sessions';
import * as usersModel from './users';
import * as shipsModel from './ships';
import * as skillsModel from './skills';
import * as countersModel from './counters';
import * as incursionMapModel from './incursion-map';
import * as incursionsModel from './incursions';
import * as warframeStatusModel from './warframe-status';

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

function updateEntry (Model, modelName, timer) {
  const urls = {
    incursions: 'https://crest.eveonline.com/incursions/',
    warframeStatus: 'http://content.warframe.com/dynamic/worldState.php'
  };
  
  helpers.request({url: urls[modelName]}, overwriteEntry, Model);
  setInterval(function () {
    helpers.request({url: urls[modelName]}, overwriteEntry, Model);
  }, timer * 60 * 1000);
  logger.init(`Model ${modelName} started autoupdate every ${timer} minutes`, 'gray');
}

export default function (sequelize, silent) {
  const Sessions       = sessionsModel.init(sequelize),
        Users          = usersModel.init(sequelize),
        Ships          = shipsModel.init(sequelize),
        Skills         = skillsModel.init(sequelize),
        Counters       = countersModel.init(sequelize),
        IncursionMaps  = incursionMapModel.init(sequelize),
        Incursions     = incursionsModel.init(sequelize),
        WarframeStatus = warframeStatusModel.init(sequelize);

  return sequelize.sync().then(() => {
    if (!silent) logger.init('Database models synced');
    updateEntry(Incursions, 'incursions', 15);
    updateEntry(WarframeStatus, 'warframeStatus', 5);
    countersModel.setDefaults();
  });
}
