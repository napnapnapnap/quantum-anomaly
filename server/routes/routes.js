'use strict';

import apiEpicArcs from './apiEpicArcs';
import apiFittingManager from './apiFittingManager';
import apiIncursions from './apiIncursions';

import * as logger from '../helpers/logger';

export default function (app) {
  app.use('/api', apiEpicArcs);
  app.use('/api', apiFittingManager);
  app.use('/api', apiIncursions);

  logger.init('Routes loaded');
};
