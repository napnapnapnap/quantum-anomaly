import shipsDynamicModel from './dynamic-models/ships-dynamic-model';

export default function (sequelize) {
  /* Because this is dynamically created from another database, we need to load
     model from a file which was created by tasks/assets-manager/shipsGet.js */
  let Ships = sequelize.define('Ships', getDynamicModel(sequelize));
  
  Ships.findById = findById.bind(Ships);
  Ships.getAllShips = getAllShips.bind(Ships);
  return Ships;
}

function getDynamicModel(sequelize) {
  let model = shipsDynamicModel(),
      sequelizeModel = {};
  Object.keys(model).map(attribute => {
    sequelizeModel[attribute] = sequelize.Sequelize[model[attribute]];
  });
  return sequelizeModel;
}

function findById(typeID) {
  return this.findOne({
    where: {
      typeID: typeID
    }
  });
}

function getAllShips() {
  return this.findAll().then(ships => ships.map(ship => ship.dataValues));
}
