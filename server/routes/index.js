import * as epicArcs from './epic-arcs';
import * as incursions from './incursions';
import * as eveFitting from './efs';
import * as warframeStatus from './warframe-status';

export default function (router) {
  router.use('/api/get-epic-arcs', epicArcs.getEpicArcs);
  router.use('/api/get-incursions', incursions.getIncursions);
  router.use('/api/get-all-ships', eveFitting.getAllShips);
  router.use('/api/get-all-skills', eveFitting.getAllSkills);
  router.use('/api/get-warframe-status', warframeStatus.getWarframeStatus);

  return router;
};
