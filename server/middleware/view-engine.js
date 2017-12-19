import expressHandlebars from 'express-handlebars';
import handlebarsHelpers from '../helpers/handelbars-helpers';

export default function (app) {
  app.engine('hbs', expressHandlebars({
    extname:       'hbs',
    defaultLayout: 'main',
    layoutsDir:    'server/views/layouts',
    partialsDir:   'server/views',
    helpers:       handlebarsHelpers()
  }));

  app.set('views', 'server/views');
  app.set('view engine', 'hbs');
};
