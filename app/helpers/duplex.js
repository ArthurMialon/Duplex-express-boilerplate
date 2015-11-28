import Waterline from 'waterline';
import models from '../models';
import Routers from '../config/routes';
import config from '../config';
import middleware from '../middleware';

/**
 * Duplex Class
 */
export default class Duplex {

  constructor() {
    /* Database Configuration */
    this.orm = new Waterline();

    /* Database Configuration */
    this.dbConfig = {
      adapters   : config.adapters,
      connections: config.connections
    };

  }

  /**
   * Get all router instance
   * @return {array} routers instances
   */
  get routers() {
    return Routers.map( router => router());
  }

  /**
   * Get middleware
   * @param {string} all names sorted
   * @return {array} array of middleware
   */
  middleware(each, ...names) {
    /* Add default middleware */
    if (each) {
      names.unshift('each');
    }

    /* Add middleware from parameters */
    return names
    .map( name => middleware[name])
    .reduce((final, middle) => {
      final = [].concat(final, middle);
      return final;
    }, []);
  }

  /**
   * Get a specific models
   * @param {string} model name
   * @return {object} model
   */
  model(name) {
    return this.models.collections[name];
  }

  /**
   * Return new instance of a controller
   * @return {function} Controller action
   */
  controller(name, param) {
    let c = require(`../controllers/${name}`).default;
    c = new c(param);
    return (action) => {
      return c[action].bind(c);
    };
  }

  /**
   * Connection to database
   * @return {function} callback
   */
  connectDB(cb) {
    /* Load models */
    models.forEach( (model) => { this.orm.loadCollection(model); });

    /* Connection to db with Waterline */
    this.orm.initialize(this.dbConfig, (err, models) => {
      if (err) throw err;

      /* Set all models in Duplex global */
      this.models = models;

      return cb();
    });
  }

}
