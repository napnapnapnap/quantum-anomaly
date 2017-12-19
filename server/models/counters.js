export default function (sequelize) {
  let Counters = sequelize.define('Counters', {
    page:  sequelize.Sequelize.STRING,
    value: sequelize.Sequelize.INTEGER
  });

  Counters.setDefaults     = setDefaults.bind(Counters);
  Counters.increaseCounter = increaseCounter.bind(Counters);
  Counters.returnCounters  = returnCounters.bind(Counters);
  return Counters;
}

function setDefaults() {
  const pages = [
    'epic-arcs',
    'overview-ships',
    'incursions'
  ];

  pages.forEach(page => {
    this.findOrCreate({
      where:    {page: page},
      defaults: {value: 0}
    });
  });
}

function increaseCounter(page) {
  return this.findOne({
    where: {
      page: page
    }
  }).then(page => {
    return page.increment('value');
  });
}

function returnCounters() {
  return this.findAll().then(counter => counter.map(counter => counter.dataValues.value));
}
