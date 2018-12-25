import * as epicArcs from '../app/eve-epic-arcs';

export function getAll(req, res) {
  res.json(epicArcs.getAll());
}

export function getFaction(req, res) {
  res.json(epicArcs.getFaction(req.params.faction));
}
