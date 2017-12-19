let Incursions;

function init(sequelize) {
  Incursions = sequelize.define('Incursions', {
    data: sequelize.Sequelize.JSON
  });
  return Incursions;
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
