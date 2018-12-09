import epicArcs from '../app/eve-epic-arcs';

export function getEpicArcs(req, res) {
  res.json(epicArcs());
}
