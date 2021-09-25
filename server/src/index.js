const env = process.env.NODE_ENV || 'development';
import dotenv from 'dotenv';
if (env === 'development') dotenv.config();
import 'regenerator-runtime/runtime'

import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import multer from 'multer';

import auth from './middleware/auth';
import cors from './middleware/cors';
import forceHttps from './middleware/force-https';

import * as logger from './helpers/logger';
import routes from './routes';
import database from './database';
import models from './models';

const PORT      = process.env.PORT || 3000,
      app       = express(),
      sequelize = database();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multer().array());
app.use(compression());
app.use(cookieParser());
app.use(methodOverride());

models(sequelize).then(() => {
  forceHttps(app);
  cors(app);
  auth(app);
  routes(app);

  app.listen(PORT);
  logger.appLog('App started');
});
