'use strict';

const env = process.env.NODE_ENV || 'development';

export default function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https' && env === 'production') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
};
