import Sequelize from 'sequelize';

let Counters;

function init(sequelize) {
  Counters = sequelize.define('Counters', {
    page:  Sequelize.STRING,
    value: Sequelize.INTEGER
  });
  setDefaults();
  return Counters;
}

function setDefaults() {
  Counters.findOrCreate({
    where:    {page: 'epic-arcs'},
    defaults: {value: 0}
  });
  Counters.findOrCreate({
    where:    {page: 'overview-ships'},
    defaults: {value: 0}
  });
  Counters.findOrCreate({
    where:    {page: 'incursions'},
    defaults: {value: 0}
  });
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
