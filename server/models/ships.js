'use strict';

import Sequelize from 'sequelize';

let Ships;

function init(sequelize) {
  Ships = sequelize.define('Ships', {
    typeID: Sequelize.INTEGER,
    value:  Sequelize.JSON
  });
  return Ships;
}

// function findById(typeID) {
//   return Ships.findOne({
//     where: {
//       typeID: typeID
//     }
//   });
// }

function getAllShips() {
  return Ships.findAll().then(ships => ships.map(ship => ship.dataValues.value));
}

export {
  init,
  // findById,
  getAllShips
};
