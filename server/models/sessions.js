'use strict';

import Sequelize from 'sequelize';

const init = (sequelize) => {
  return sequelize.define('Sessions', {
    sid:       {
      type:       Sequelize.STRING(255),
      primaryKey: true
    },
    expire:    {
      type:      Sequelize.DATE,
      allowNull: true
    },
    sess:      Sequelize.JSON,
    createdAt: {
      type:      Sequelize.DATE,
      allowNull: true
    },
    updatedAt: {
      type:      Sequelize.DATE,
      allowNull: true
    }
  });
};

export {init};
