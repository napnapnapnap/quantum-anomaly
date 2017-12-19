'use strict';

import express from 'express';

import incursions from '../app/incursions';
import * as logger from '../helpers/logger';

const router = express.Router();

router.use('/get-incursions', (req, res) => {
  logger.access(req.user, 'Request incursions status');
  incursions().then(data => {
    res.json(data);
  });
});

module.exports = router;
