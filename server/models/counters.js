let Counters;

function init(sequelize) {
  Counters = sequelize.define('Counters', {
    page:  sequelize.Sequelize.STRING,
    value: sequelize.Sequelize.INTEGER
  });
  return Counters;
}

function setDefaults() {
  const pages = [
    'epic-arcs',
    'overview-ships',
    'incursions'
  ];

  pages.forEach(page => {
    Counters.findOrCreate({
      where:    {page: page},
      defaults: {value: 0}
    });
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
  setDefaults,
  returnCounters
};
