import Sequelize from 'sequelize';

import configuration from './config';
import * as logger from './helpers/logger';

export default function () {
  const databaseUrl = process.env.DATABASE_URL;

  const sequelize = new Sequelize(databaseUrl, {
    dialectOptions:   {
      timeout: 30,
      ssl:     databaseUrl.indexOf('ssl=true') !== -1
    },
    pool:             {
      max:            5,
      min:            0,
      idle:           30000,
      maxConnections: 5,
      maxIdleTime:    30
    },
    logging:          configuration.database.logging
  });

  logger.appLog('Database connection established');
  return sequelize;
};
