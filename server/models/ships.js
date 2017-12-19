import shipsDynamicModel from './dynamic-models/ships-dynamic-model';

let Ships;

function getDynamicModel(sequelize) {
  let model = shipsDynamicModel(),
      sequelizeModel = {};
  Object.keys(model).map(attribute => {
    sequelizeModel[attribute] = sequelize.Sequelize[model[attribute]];
  });
  return sequelizeModel;
}

function init(sequelize) {
  /* 
     Because this is dynamically created from another database, we need to load
     model from a file which was created by tasks/assets-manager/shipsGet.js
  */
  Ships = sequelize.define('Ships', getDynamicModel(sequelize));
  return Ships;
}

function findById(typeID) {
  return Ships.findOne({
    where: {
      typeID: typeID
    }
  });
}

function getAllShips() {
  return Ships.findAll().then(ships => ships.map(ship => ship.dataValues));
}

export {
  init,
  findById,
  getAllShips
};
