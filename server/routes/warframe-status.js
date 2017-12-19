import express from 'express';

import warframeStatus from '../app/warframe-status';
import * as logger from '../helpers/logger';

const router = express.Router();

router.use('/get-warframe-status', (req, res) => {
  logger.access(req.user, 'Request warframe status');
  warframeStatus().then(data => {
    res.json(data);
  });
});

module.exports = router;
