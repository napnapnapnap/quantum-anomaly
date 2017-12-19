import * as logger from '../helpers/logger';
import warframeStatus from '../app/warframe-status';

export default function (router) {
  router.use('/get-warframe-status', (req, res) => {
    logger.access(req.user, 'Request warframe status');
    warframeStatus().then(data => {
      res.json(data);
    });
  });
  
  return router;
}
