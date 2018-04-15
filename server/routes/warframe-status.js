import warframeStatus from '../app/warframe-status';

export default function (router) {
  router.use('/get-warframe-status', (req, res) => {
    warframeStatus().then(data => res.json(data));
  });
  
  return router;
}
