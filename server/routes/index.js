'use strict';

import apiEpicArcs from './epic-arcs';
import apiFittingManager from './incursions';
import apiIncursions from './efs';
import apiWarframeStatus from './warframe-status';

import * as logger from '../helpers/logger';

export default function (app) {
  app.use('/api', apiEpicArcs);
  app.use('/api', apiFittingManager);
  app.use('/api', apiIncursions);
  app.use('/api', apiWarframeStatus);

  logger.init('Routes loaded');
};
