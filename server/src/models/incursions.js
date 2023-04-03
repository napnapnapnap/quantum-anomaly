export default function (sequelize) {
  let Incursions = sequelize.define('Incursions', {
    data: sequelize.Sequelize.JSON,
  });

  Incursions.get = getIncursions.bind(Incursions);
  return Incursions;
}

function getIncursions() {
  return this.findAll({
    limit: 1,
    order: [['createdAt', 'DESC']],
  }).then((incursions) => incursions[0].dataValues.data);
}
