import * as logger from './helpers/logger';
import * as sessionsModel from './models/sessions';
import * as userModel from './models/users';
import * as shipsModel from './models/ships';
import * as skillsModel from './models/skills';
import * as countersModel from './models/counters';
import * as incursionMapModel from './models/incursion-map';
import * as incursionsModel from './models/incursions';
import * as warframeStatusModel from './models/warframe-status';

export default function (connection, silent) {
  return Promise.all([
      sessionsModel.init(connection).sync(),
      userModel.init(connection).sync(),
      shipsModel.init(connection).sync(),
      skillsModel.init(connection).sync(),
      countersModel.init(connection).sync(),
      incursionMapModel.init(connection).sync(),
      incursionsModel.init(connection).sync(),
      warframeStatusModel.init(connection).sync()
    ])
    .then(() => {
      if (!silent) logger.init('Database models synced');
    });
}
