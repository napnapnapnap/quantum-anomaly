import Sequelize from 'sequelize';
import * as helpers from '../helpers';

let Incursions;

function init(sequelize) {
  Incursions = sequelize.define('Incursions', {
    data: Sequelize.JSON
  });

  updateIncursions(Incursions);
  setInterval(function () {
    updateIncursions(Incursions);
  }, 15 * 60 * 1000);

  return Incursions;
}

function updateIncursions() {
  const options = {url: 'https://crest.eveonline.com/incursions/'};
  helpers.request(options, createIncursionsEntry);
}

function createIncursionsEntry(error, response) {
  if (error) {
    return;
  }
  Incursions.create({
    data: response.body
  }).then(function (incursion) {
    Incursions.destroy({
      where: {
        id: {
          [Sequelize.Op.ne]: incursion.get('id')
        }
      }
    });
  });
}

function getIncursions() {
  return Incursions.findAll({
    limit: 1,
    order: [['createdAt', 'DESC']]
  }).then(incursions => incursions[0].dataValues.data);
}

export {
  init,
  getIncursions
};
