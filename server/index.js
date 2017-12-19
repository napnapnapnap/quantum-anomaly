const env = process.env.NODE_ENV || 'development';
import dotenv from 'dotenv';

if (env === 'development') dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import multer from 'multer';
import path from 'path';
import serveStatic from 'serve-static';

import * as logger from './helpers/logger';
import routes from './routes';
import database from './database';

import auth from './middleware/auth';
import cors from './middleware/cors';
import forceHttps from './middleware/force-https';

const PORT = process.env.PORT || 3000;
const app  = express();

let frontendPublicPath = path.join(__dirname, '..', 'frontend', 'build');
if (process.env.NODE_ENV === 'production') frontendPublicPath = path.join(__dirname, '..', '..' ,'frontend', 'build');

app.use(forceHttps);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multer().array());
app.use(compression());
app.use(cookieParser());
app.use(methodOverride());

database().then(() => {
  app.use(forceHttps);
  if (process.env.NODE_ENV === 'production') logger.init('HTTPS module activated');

  app.use(cors);
  logger.init('CORS module activated');

  app.use('/', serveStatic(frontendPublicPath));
  logger.init(`React build files from ${frontendPublicPath} loaded on '/' route`);

  auth(app);
  logger.init('Auth module loaded');

  routes(app);
  logger.init('Express routing loaded');

  app.use('*', serveStatic(frontendPublicPath));
  logger.init(`React build files from ${frontendPublicPath} loaded on '*' route`);

  app.listen(PORT);
  logger.init('App started');
});
