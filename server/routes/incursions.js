import * as logger from '../helpers/logger';
import incursions from '../app/incursions';

export default function (router) {
  router.use('/get-incursions', (req, res) => {
    logger.access(req.user, 'Request incursions status');
    incursions().then(data => {
      res.json(data);
    });
  });

  return router;
}
