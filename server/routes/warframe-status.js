import warframeStatus from '../app/warframe-status';

export function getWarframeStatus(req, res) {
  warframeStatus().then(data => res.json(data));
}
