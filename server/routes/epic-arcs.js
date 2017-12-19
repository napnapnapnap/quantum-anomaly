import express from 'express';

import epicArcs from '../app/epic-arcs';
import * as logger from '../helpers/logger';

const router = express.Router();

router.use('/get-epic-arcs', (req, res) => {
  logger.access(req.user, 'Request epic arcs');
  res.json(epicArcs());
});


module.exports = router;
