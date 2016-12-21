'use strict';

import apiEpicArcs from './apiEpicArcs';
import apiFittingManager from './apiFittingManager';

import * as logger from '../helpers/logger';

export default function (app) {
  app.use('/api', apiEpicArcs);
  app.use('/api', apiFittingManager);

  logger.init('Routes loaded');
};
