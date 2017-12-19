import * as logger from '../helpers/logger';
import * as sessionsModel from './sessions';
import * as userModel from './users';
import * as shipsModel from './ships';
import * as skillsModel from './skills';
import * as countersModel from './counters';
import * as incursionMapModel from './incursion-map';
import * as incursionsModel from './incursions';
import * as warframeStatusModel from './warframe-status';

export default function (sequelize, silent) {
  sessionsModel.init(sequelize);
  userModel.init(sequelize);
  shipsModel.init(sequelize);
  skillsModel.init(sequelize);
  countersModel.init(sequelize);
  incursionMapModel.init(sequelize);
  incursionsModel.init(sequelize);
  warframeStatusModel.init(sequelize);

  return sequelize.sync().then(() => {
    if (!silent) logger.init('Database models synced');
  });
}
