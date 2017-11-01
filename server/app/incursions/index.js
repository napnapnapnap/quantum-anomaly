import * as IncursionMap from '../../models/incursion-map';
import * as Incursions from '../../models/incursions';

import * as helpers from '../../helpers'

function getIncursionData(activeIncursions) {
  let promiseArray = activeIncursions.map(incursion =>
    IncursionMap.findById(incursion.constellation.id).then(constellation => {
      incursion.info = constellation.dataValues.value;
      delete incursion.infestedSolarSystems;
      
      let systems = incursion.info.systems;
      systems.forEach(system => {
        if (system.incursionType === 'HQ') system.typeSort = 0;
        else if (system.incursionType === 'AS') system.typeSort = 1;
        else if (system.incursionType === 'VG') system.typeSort = 2;
        else if (system.incursionType === 'ST') system.typeSort = 3;
        else if (system.incursionType === 'N/A') system.typeSort = 4;
        system.radius = Math.ceil(system.radius);
        delete system.constellationID;
      });
      systems.sort(helpers.dynamicSortMultiple('typeSort', 'radius'));
      
      return incursion;
    })
  );
  return Promise.all(promiseArray);
}

export default function () {
  return Incursions.getIncursions().then((activeIncursions) => {
    activeIncursions = JSON.parse(activeIncursions);
    return getIncursionData(activeIncursions.items);
  });
};
