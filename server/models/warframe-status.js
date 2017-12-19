export default function (sequelize) {
  let WarframeStatus = sequelize.define('WarframeStatus', {
    data: sequelize.Sequelize.JSON
  });

  WarframeStatus.get = getWarframeStatus.bind(WarframeStatus);
  return WarframeStatus;
}

function getWarframeStatus() {
  return this.findAll({
    limit: 1,
    order: [['createdAt', 'DESC']]
  }).then(warframeStatus => warframeStatus[0].dataValues.data);
}
