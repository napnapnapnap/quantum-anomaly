import ships from '../app/efs/ships/ships';
import skills from '../app/efs/skills/skills';

export default function (router) {
  router.use('/get-all-ships', (req, res) => {
    ships().then(shipsData => res.json(shipsData));
  });

  router.use('/get-all-skills', (req, res) => {
    skills().then(skillsData => res.json(skillsData));
  });
  
  return router;
}
