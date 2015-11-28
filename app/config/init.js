import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import express from 'express';
import config from './index';
import passport from 'passport';
import hbs from 'hbs';
import passportStrategy from './passport';


/**
 * Express configuration
 */
export default (app) => {

  /**
   * Config express
   */

 /**
  * ==========================================
  * Views configuration
  * ==========================================
  */

  /* Set views engine */
  app.set('view engine', 'hbs');

  /* Set views directory */
  app.set('views', './app/views');

  /* Set /public directory public/img ==> /img in template */
  app.use(express.static(__dirname + '/../../public'));

  /**
   * Extends Handlbars with #extends #blocks
   */

  let blocks = {};
  hbs.registerHelper('extend', (name, context) => {
    let block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this));
  });

  hbs.registerHelper('block', (name) => {
    let val = (blocks[name] || []).join('\n');
    blocks[name] = [];
    return val;
  });


  /**
   * ==========================================
   * Logic configuration
   * ==========================================
   */

  /* Set Passport configuration */
  passportStrategy(passport);

  /* Set sessions */
  app.use(session(config.sessions));

  /* Set Passport configuration */
  app.use(passport.initialize());
  app.use(passport.session());

  /* Set Passport in Duplex to use it as middleware */
  Duplex.passport = passport;

  /* Log request */
  app.use(morgan('dev'));

  /* Parsing body */
  app.use(bodyParser.urlencoded({'extended':'true'}));
  app.use(bodyParser.json({type: 'application/vnd.api+json'}));

  /* Fake DELETE / PUT method */
  app.use(methodOverride());

  /**
   * Config routers
   */
  Duplex.routers.forEach( router => {
    app.use(router.prefix, router.router);
  });

  return app;
};
