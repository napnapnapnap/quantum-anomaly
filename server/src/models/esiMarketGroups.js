export default function (sequelize) {
  return sequelize.define('EsiMarketGroups', {
    id:   {
      type:       sequelize.Sequelize.INTEGER,
      primaryKey: true
    },
    data: sequelize.Sequelize.JSON,
  });
};
