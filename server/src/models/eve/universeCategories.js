export default function (sequelize) {
  return sequelize.define('EveUniverseCategories', {
    id: {
      type: sequelize.Sequelize.INTEGER,
      primaryKey: true,
    },
    groups: sequelize.Sequelize.ARRAY(sequelize.Sequelize.STRING),
    name: sequelize.Sequelize.STRING,
  });
}
