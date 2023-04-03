import Sequelize from 'sequelize';

import * as helpers from '../helpers';
import * as logger from '../helpers/logger';
import esiDogmaAttributesModel from './esiDogmaAttributes';
import esiDogmaEffectsModel from './esiDogmaEffects';
// Data which get filled from EVE API
import esiMarketGroupsModel from './esiMarketGroups';
import esiUniverseCategoriesModel from './esiUniverseCategories';
import esiUniverseModel from './esiUniverseGroups';
import esiUniverseTypesModel from './esiUniverseTypes';
import eveUniverseCategoriesModel from './eve/universeCategories';
import eveCacheModel from './eveCache';
import eveModuleGroupsModel from './eveModuleGroups';
import eveModulesModel from './eveModules';
import eveNpcsModel from './eveNpcs';
import eveShipGroupsModel from './eveShipGroups';
// Custom data which gets created afterwards
import eveShipsModel from './eveShips';
import incursionMapModel from './incursion-map';
import incursionsModel from './incursions';
import sessionsModel from './sessions';
import skillsModel from './skills';
import usersModel from './users';

function overwriteEntry(error, response, Model) {
  if (error) return;
  let data;
  try {
    data = JSON.parse(response.body);
  } catch (e) {
    logger.error('Response could not be parsed');
    return;
  }
  if (data.error) {
    logger.error(`Request was successful, but incoming data has error:  ${data.error}`);
    return;
  }

  Model.create({
    data: JSON.parse(response.body),
  }).then(function (data) {
    Model.destroy({
      where: {
        id: {
          [Sequelize.Op.ne]: data.get('id'),
        },
      },
    });
  });
}

function updateEntry(Model, modelName, timer) {
  const urls = {
    incursions: 'https://esi.evetech.net/latest/incursions/?datasource=tranquility',
  };

  helpers.request({ url: urls[modelName] }, overwriteEntry, Model);
  setInterval(function () {
    helpers.request({ url: urls[modelName] }, overwriteEntry, Model);
  }, timer * 60 * 1000);
  logger.appLog(`Model ${modelName} started autoupdate every ${timer} minutes`, 'gray');
}

let models = {};

export default async function (sequelize, silent) {
  models = {
    EsiMarketGroups: esiMarketGroupsModel(sequelize),
    EsiUniverseCategories: esiUniverseCategoriesModel(sequelize),
    EsiUniverseTypes: esiUniverseTypesModel(sequelize),
    EsiUniverseGroups: esiUniverseModel(sequelize),
    EsiDogmaAttributes: esiDogmaAttributesModel(sequelize),
    EsiDogmaEffects: esiDogmaEffectsModel(sequelize),
    EveShips: eveShipsModel(sequelize),
    EveShipGroups: eveShipGroupsModel(sequelize),
    EveModules: eveModulesModel(sequelize),
    EveModuleGroups: eveModuleGroupsModel(sequelize),
    EveNpcs: eveNpcsModel(sequelize),
    EveCache: eveCacheModel(sequelize),
    Sessions: sessionsModel(sequelize),
    Users: usersModel(sequelize),
    Skills: skillsModel(sequelize),
    IncursionMaps: incursionMapModel(sequelize),
    Incursions: incursionsModel(sequelize),
    EveUniverseCategories: eveUniverseCategoriesModel(sequelize),
  };

  await sequelize.sync().then(() => {
    if (!silent) logger.appLog('Database models synced');
    updateEntry(models.Incursions, 'incursions', 10);
    return models;
  });
}

export { models };
