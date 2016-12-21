'use strict';

import Sequelize from 'sequelize';

let Counters;

function init(sequelize) {
  Counters = sequelize.define('Counters', {
    page:  Sequelize.STRING,
    value: Sequelize.INTEGER
  });
  return Counters;
}

function increaseCounter(page) {
  return Counters.findOne({
    where: {
      page: page
    }
  }).then(page => {
    return page.increment('value');
  });
}

function returnCounters() {
  return Counters.findAll().then(counter => counter.map(counter => counter.dataValues.value));
}


export {
  init,
  increaseCounter,
  returnCounters
};
