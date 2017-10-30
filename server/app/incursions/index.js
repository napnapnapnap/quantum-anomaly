import * as IncursionMap from '../../models/incursion-map';
import * as Incursions from '../../models/incursions';

function getIncursionData(activeIncursions) {
  let promiseArray = activeIncursions.map(incursion =>
    IncursionMap.findById(incursion.constellation.id).then(constellation => {
      incursion.info = constellation.dataValues.value;
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
