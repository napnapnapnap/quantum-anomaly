'use strict';

import * as logger from './helpers/logger';
import * as sessionsModel from './models/sessions';
import * as userModel from './models/users';
import * as shipsModel from './models/ships';
import * as skillsModel from './models/skills';
import * as countersModel from './models/counters';

let modelsCollection = {};

function setDefaults () {
  modelsCollection.Counters.findOrCreate({
    where: {page: 'epic-arcs'},
    defaults: {value: 0}
  });
  modelsCollection.Counters.findOrCreate({
    where: {page: 'overview-ships'},
    defaults: {value: 0}
  });
}

function init(connection, silent) {
  return new Promise((resolve, reject) => {
    modelsCollection = {
      'Sessions': sessionsModel.init(connection),
      'Users':    userModel.init(connection),
      'Ships':    shipsModel.init(connection),
      'Skills':   skillsModel.init(connection),
      'Counters': countersModel.init(connection)
    };

    Promise.all([
        modelsCollection.Sessions.sync(),
        modelsCollection.Users.sync(),
        modelsCollection.Ships.sync(),
        modelsCollection.Skills.sync(),
        modelsCollection.Counters.sync()
      ])
      .then(() => {
        if (!silent) {
          logger.init('Database models synced');
        }
        setDefaults();
        resolve();
      });
  });
}

function models() {
  return modelsCollection;
}

export {
  init,
  models
};
