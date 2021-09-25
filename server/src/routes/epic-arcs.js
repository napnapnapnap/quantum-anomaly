import * as epicArcs from '../app/eve-epic-arcs';

export function getInfo(req, res) {
  res.json(epicArcs.getInfo());
}

export function getEpicArc(req, res) {
  res.json(epicArcs.getEpicArc(req.params.faction));
}
