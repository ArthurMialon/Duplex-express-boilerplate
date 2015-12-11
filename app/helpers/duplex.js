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
   * Get all socket connections
   * @return {object} connetions
   */
  get connections() {
    return this.io.sockets.connected;
  }

  /**
   * Get all socketsId
   * @return {array} connections ids
   */
  get socketIds() {
    let result = [];
    Object.keys(this.connections).forEach( id => {
      result.push(this.connections[id].id);
    });
    return result;
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
    .reduce( (final, middle) => {
      return [].concat(final, middle);
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
    return (action) => c[action].bind(c);
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

      console.log("Connected to database : OK !");
      return cb();
    });
  }

  /**
   * Response API Data
   * @param {object} Response object
   * @param {string|int} type (success / http error status)
   * @param {mixed} data
   */
  response(res, type, data) {

    /* Error case */
    if (type != "success" || type >= 300) {
      return res.status(parseInt(type)).send({
        status : parseInt(type),
        message: require('../config/errors').default[parseInt(type)] || data || "Something went wrong..."
      });
    }

    /* Success case */
    return res.status(200).send({
      status : 200,
      message: 'ok',
      data   : data
    });
  }

}
