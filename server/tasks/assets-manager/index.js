'use strict';

const env = process.env.NODE_ENV || 'development';
import dotenv from 'dotenv';

if (env === 'development') dotenv.config();

import Sequelize from 'sequelize';

import getShips from './ships-get';
import saveShips from './ships-set';
import getSkills from './skills-get';
import saveSkills from './skills-set';
import getIncursionMap from './incursion-map-get';
import saveIncursionMap from './incursion-map-set';
import * as logger from '../../helpers/logger';

function startMigration() {
  let rowsAdded = 0;

  const eveSequelize = new Sequelize(process.env.EVE_DATABASE_URL, {logging: false});
  logger.init('EVE Database connection established');

  let sequelize;

  if (process.env.UPDATE_LIVE === 'true') {
    sequelize = new Sequelize(process.env.DATABASE_URL_LIVE, {
      logging:        false,
      dialect:        'postgres',
      protocol:       'postgres',
      dialectOptions: {
        ssl: true
      },
      pool: {
        max: 10,
        min: 1,
        idle: 50000,
        acquire: 20000
      }
    });
    logger.init('Database connection established');
    logger.log('YOU ARE CONNECTED TO LIVE DATABASE, BETTER NOT MESS THIS UP!', ['access'], 'red');
  } else {
    sequelize = new Sequelize(process.env.DATABASE_URL, {logging: false});
    logger.init('Database connection established');
  }

  getShips(eveSequelize).then(ships => {
    rowsAdded += ships.length;
    return saveShips(sequelize, ships);
  }).then(() => {
    return getSkills(eveSequelize);
  }).then((skills) => {
    rowsAdded += skills.length;
    return saveSkills(sequelize, skills);
  }).then(() => {
    return getIncursionMap(eveSequelize);
  }).then((mapData) => {
    rowsAdded += mapData.length;
    return saveIncursionMap(sequelize, mapData);
  }).then(() => {
    logger.action('Number of rows added: ' + rowsAdded, ['access'], 'yellow');
    process.exit(0);
  });
}

startMigration();
