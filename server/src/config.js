const configuration = {
  database: {
    checkExpirationInterval: 900000,
    expiration:              86400000,
    autoReconnect:           true,
    keepAlive:               true,
    keepAliveInterval:       30000,
    logging:                 false
  },
  logger:   {
    silent: false
  },
  ajaxHeaders: {
    'User-Agent': 'Quantum Anomaly'
  }
};

export default configuration;
