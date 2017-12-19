let IncursionMap;

function init(sequelize) {
  IncursionMap = sequelize.define('IncursionMap', {
    constellationID: sequelize.Sequelize.INTEGER,
    value:           sequelize.Sequelize.JSON
  });
  return IncursionMap;
}

function findById(constellationID) {
  return IncursionMap.findOne({
    where: {
      constellationID: constellationID
    }
  });
}

export {
  init,
  findById
};
