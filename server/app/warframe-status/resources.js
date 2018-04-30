import planets from './resources/planets';
import * as helpers from '../../helpers'

export default function () {
  let resources = {},
      sorted =  {};
  planets.forEach(planet => {
    planet.resources.forEach(resource => {
      if (!resources[resource]) resources[resource] = [];
      if (resources[resource].indexOf(planet.name) === -1) resources[resource].push(planet.name);
    });
  });
  Object.keys(resources).sort().forEach(function(key) {
    sorted[key] = resources[key];
  });
  return sorted;
};
