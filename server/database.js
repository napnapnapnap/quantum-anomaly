'use strict';

import Sequelize from 'sequelize';

import configuration from './config';
import * as modelsCollection from './model-collection'
import * as logger from './helpers/logger';

export default function () {
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      timeout: 30
    },
    pool:           {
      max:            5,
      min:            0,
      idle:           30000,
      maxConnections: 5,
      maxIdleTime:    30
    },
    logging:        configuration.database.logging
  });
  logger.init('Database connection established');
  return modelsCollection.init(sequelize);
};
