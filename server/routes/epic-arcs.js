import * as logger from '../helpers/logger';
import epicArcs from '../app/epic-arcs';

export default function (router) {
  router.use('/get-epic-arcs', (req, res) => {
    logger.access(req.user, 'Request epic arcs');
    res.json(epicArcs());
  });
  
  return router;
}
