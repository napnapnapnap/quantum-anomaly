import incursions from '../app/incursions';

export function getIncursions(req, res) {
  incursions().then((data) => res.json(data));
}
