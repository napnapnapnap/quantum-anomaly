'use strict';

import apiEpicArcs from './epicArcs';
import apiFittingManager from './incursions';
import apiIncursions from './efs';

import * as logger from '../helpers/logger';

export default function (app) {
  app.use('/api', apiEpicArcs);
  app.use('/api', apiFittingManager);
  app.use('/api', apiIncursions);

  logger.init('Routes loaded');
};
