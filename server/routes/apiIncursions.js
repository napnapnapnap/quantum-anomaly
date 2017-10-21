'use strict';

import express from 'express';

import * as logger from '../helpers/logger';
import ships from '../app/fitting-manager/ships/ships';
import skills from '../app/fitting-manager/skills/skills';

const router = express.Router();

router.use('/get-all-ships', (req, res) => {
  logger.access(req.user, 'Request all ships');
  ships().then(shipsData => {
    res.json(shipsData);
  });
});

router.use('/get-all-skills', (req, res) => {
  logger.access(req.user, 'Request all skills');
  skills().then(skillsData => {
    res.json(skillsData);
  });
});

module.exports = router;
