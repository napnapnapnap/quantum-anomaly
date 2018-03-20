import {models} from '../../models';
import * as helpers from '../../helpers';

function getIncursionData(activeIncursions) {
  let promiseArray = activeIncursions.map(incursion =>
    models.IncursionMaps.findById(incursion.constellation_id).then(constellation => {
      constellation               = constellation.dataValues.value;
      incursion.factionID         = constellation.factionID;
      incursion.factionName       = constellation.factionName;
      incursion.constellationName = constellation.constellationName;
      incursion.constellationID   = incursion.constellation_id;
      incursion.systems           = constellation.systems;
      incursion.influence         = Math.round(incursion.influence * 100);

      let systems = incursion.systems;
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

      delete incursion.infestedSolarSystems;
      delete incursion.constellation;
      return incursion;
    })
  );
  return Promise.all(promiseArray);
}

export default function () {
  return models.Incursions.get().then(activeIncursions => {
    return getIncursionData(activeIncursions);
  });
};
