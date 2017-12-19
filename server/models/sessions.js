const init = (sequelize) => {
  return sequelize.define('Sessions', {
    sid:       {
      type:       sequelize.Sequelize.STRING(255),
      primaryKey: true
    },
    expire:    {
      type:      sequelize.Sequelize.DATE,
      allowNull: true
    },
    sess:      sequelize.Sequelize.JSON,
    createdAt: {
      type:      sequelize.Sequelize.DATE,
      allowNull: true
    },
    updatedAt: {
      type:      sequelize.Sequelize.DATE,
      allowNull: true
    }
  });
};

export {init};
