export default function (sequelize) {
  let IncursionMap = sequelize.define('IncursionMap', {
    constellationID: sequelize.Sequelize.INTEGER,
    value: sequelize.Sequelize.JSON,
  });

  IncursionMap.findById = findById.bind(IncursionMap);
  return IncursionMap;
}

function findById(constellationID) {
  return this.findOne({
    where: {
      constellationID: constellationID,
    },
  });
}
