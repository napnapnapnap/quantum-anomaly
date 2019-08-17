import eveGenerateData from '../tasks/eve/generate-data';
import eveGenerateMarketTree from '../tasks/eve/generate-market-tree';
import eveGenerateNpcInformation from '../tasks/eve/generate-npc-information';

const ALLOWED = ['UniverseCategories',
                 'UniverseGroups',
                 'UniverseTypes',
                 'DogmaAttributes',
                 'DogmaEffects',
                 'MarketGroups'];


export function generateMarket(req, res) {
  eveGenerateMarketTree(9).then(data => res.json('Creating market cache'));
}

export function generateAll(req, res) {
  // notable: 6 - ships, 7 - modules , 8 - charges, 16 - implants, 18 - drones, 32 - T3 subsystems, 87 - fighters
  eveGenerateData(6)
    .then(data => eveGenerateData(7))
    .then(data => eveGenerateMarketTree(9))
    .then(data => eveGenerateNpcInformation())
    .then(data => res.json('Triggered all data generation, check server logs for progress'));
}

export function generateNpcs(req, res) {
  eveGenerateNpcInformation().then(data => res.json(data));
}
