'use strict';

import Sequelize from 'sequelize';
import moment from 'moment';
import * as helpers from '../helpers';
import {inspect} from '../helpers/logger';

let WarframeStatus;

function init(sequelize) {
  WarframeStatus = sequelize.define('WarframeStatus', {
    data: Sequelize.JSON
  });

  updateWarframeStatus(WarframeStatus);
  setInterval(function () {
    updateWarframeStatus(WarframeStatus);
  }, 15 * 60 * 1000);

  return WarframeStatus;
}

function updateWarframeStatus() {
  const options = {url: 'http://content.warframe.com/dynamic/worldState.php'};
  helpers.request(options, createWarframeStatusEntry);
}

function createWarframeStatusEntry(error, response) {
  if (error) {
    return;
  }

  WarframeStatus.create({
    data: JSON.parse(response.body)
  }).then(function (warframeStatus) {
    WarframeStatus.destroy({
      where: {
        id: {
          [Sequelize.Op.ne]: warframeStatus.get('id')
        }
      }
    });
  });
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
