let WarframeStatus;

function init(sequelize) {
  WarframeStatus = sequelize.define('WarframeStatus', {
    data: sequelize.Sequelize.JSON
  });
  return WarframeStatus;
}

function getWarframeStatus() {
  return WarframeStatus.findAll({
    limit: 1,
    order: [['createdAt', 'DESC']]
  }).then(warframeStatus => warframeStatus[0].dataValues.data);
}

export {
  init,
  getWarframeStatus
};
