import epicArcs from '../app/epic-arcs';

export function getEpicArcs(req, res) {
  res.json(epicArcs());
}
