import incursions from '../app/incursions';

export default function (router) {
  router.use('/get-incursions', (req, res) => {
   incursions().then(data => res.json(data));
  });

  return router;
}
