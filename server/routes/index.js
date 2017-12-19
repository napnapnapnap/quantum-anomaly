import express from 'express';

import apiEpicArcs from './epic-arcs';
import apiFittingManager from './incursions';
import apiIncursions from './efs';
import apiWarframeStatus from './warframe-status';

export default function (app) {
  const router = express.Router();
  
  app.use('/api', apiEpicArcs(router));
  app.use('/api', apiFittingManager(router));
  app.use('/api', apiIncursions(router));
  app.use('/api', apiWarframeStatus(router));
};
