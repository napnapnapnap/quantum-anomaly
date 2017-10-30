import * as IncursionMap from '../../models/incursion-map';
import * as Incursions from '../../models/incursions';

function getIncursionData(activeIncursions) {
  let promiseArray = activeIncursions.map(incursion =>
    IncursionMap.findById(incursion.constellation.id).then(constellation => {
      const islands  = ['Goins', 'Mayonhen', 'Orvanne', 'Unour', 'Pietanen'],
            result   = [];
      
      incursion.info = constellation.dataValues.value;
      delete incursion.infestedSolarSystems;

      // for (var system = 0; system < incursion.systems.length; system++) {
      //   incursion.systems[system].systemRadius = Math.round(incursion.systems[system].systemRadius, 0);
      //
      //   if (incursion.systems[system].incursionType == 'HQ') incursion.systems[system].typeSort = 0;
      //   else if (incursion.systems[system].incursionType == 'AS') incursion.systems[system].typeSort = 1;
      //   else if (incursion.systems[system].incursionType == 'VG') incursion.systems[system].typeSort = 2;
      //   else if (incursion.systems[system].incursionType == 'ST') incursion.systems[system].typeSort = 3;
      //   else if (incursion.systems[system].incursionType == 'NA') incursion.systems[system].typeSort = 4;
      //
      //   // check if lowsec system
      //   if (incursion.systems[system].systemSecurity < 0.5) {
      //     numberOfLowsecSystems++;
      //   } else if (incursion.systems[system].systemSecurity === 1) {
      //     incursion.systems[system].systemSecurity = '1.0';
      //   }
      // }

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
