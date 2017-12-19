import Sequelize from 'sequelize';

let IncursionMap;

function init(sequelize) {
  IncursionMap = sequelize.define('IncursionMap', {
    constellationID: Sequelize.INTEGER,
    value:           Sequelize.JSON
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
