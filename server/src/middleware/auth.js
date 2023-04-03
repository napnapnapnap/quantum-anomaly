import jwt from 'jsonwebtoken';

import * as logger from '../helpers/logger';
import { models } from '../models';

const secretKey = process.env.SECRET_KEY;

export default function (app) {
  app.post('/user/login', (req, res) => {
    models.Users.findUser(req.body.email).then((user) => {
      if (!user) {
        logger.error('User failed to login because he is not registered');
        res.send({ error: true, message: 'Wrong credentials provided' });
      } else {
        if (models.Users.validatePassword(req.body.password, user.password)) {
          const authObject = {
            id: user.id,
            email: user.email,
            name: user.name,
          };

          const token = jwt.sign(JSON.stringify(authObject), secretKey);
          logger.action(`User ${req.body.email} logged in`);
          res.send({ ...authObject, token });
        } else {
          logger.error('User failed to login because of wrong password');
          res.send({ error: true, message: 'Wrong credentials provided' });
        }
      }
    });
  });

  app.get('/user/info', (req, res) => {
    try {
      req.authObject = jwt.verify(verifyToken(req), secretKey);
      res.send({ ...req.authObject });
    } catch (err) {
      logger.error(err);
      res.sendStatus(401);
    }
  });
  logger.appLog('Authentication module loaded');
}

function verifyToken(req) {
  const bearerHeader = req.headers['authorization'];
  return typeof bearerHeader !== 'undefined' ? bearerHeader.split(' ')[1] : null;
}

export function ensureAuthenticated(req, res, next) {
  try {
    req.authObject = jwt.verify(verifyToken(req), secretKey);
    return next();
  } catch (err) {
    logger.error(err);
    res.sendStatus(401);
  }
}
