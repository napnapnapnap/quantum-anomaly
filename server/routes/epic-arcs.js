import epicArcs from '../app/epic-arcs';

export default function (router) {
  router.use('/get-epic-arcs', (req, res) => {
    res.json(epicArcs());
  });
  
  return router;
}
