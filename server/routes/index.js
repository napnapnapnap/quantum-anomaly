import apiEpicArcs from './epic-arcs';
import apiFittingManager from './incursions';
import apiIncursions from './efs';
import apiWarframeStatus from './warframe-status';

export default function (router) {
  router.use('/api', apiEpicArcs(router));
  router.use('/api', apiFittingManager(router));
  router.use('/api', apiIncursions(router));
  router.use('/api', apiWarframeStatus(router));
  
  return router;
};
