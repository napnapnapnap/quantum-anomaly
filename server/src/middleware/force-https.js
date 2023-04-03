import * as logger from '../helpers/logger';

const env = process.env.NODE_ENV || 'development';

function forceLiveDomain(req, res, next) {
  if (req.get('Host') === 'quantum-anomaly.herokuapp.com') {
    return res.redirect(301, 'https://www.qsna.eu' + req.originalUrl);
  }
  // if (req.get('Host') === 'qsna.eu') {
  //   return res.redirect(301, 'https://www.qsna.eu' + req.originalUrl);
  // }
  next();
}

function forceHttps(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https' && env === 'production') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
}

export default function (app) {
  if (process.env.NODE_ENV === 'production') {
    app.use(forceHttps);
    app.use(forceLiveDomain);
    logger.appLog('HTTPS module activated');
  } else {
    logger.appWarning('Non production enviroment, HTTPS redirect disabled');
  }
}
