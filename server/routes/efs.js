import express from 'express';

import * as logger from '../helpers/logger';
import ships from '../app/efs/ships/ships';
import skills from '../app/efs/skills/skills';

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
