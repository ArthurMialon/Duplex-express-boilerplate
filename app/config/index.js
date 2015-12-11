/**
 * Global configuration
 */
export default {

  /* Port listening the application */
  port: process.env.PORT || 8080,

  /* Sessions configuration for express */
  sessions: {
    secret: 'mysupersecretkey',
    resave: false,
    saveUninitialized: false
  },

  /* JsonWebToken configuration */
  jwt: {
    secret: "secretkeyforjwt"
  },

  /*---------------------------------------------/
  | Databases configuration
  | The framework uses the Waterline ORM
  | See documentation at:
  | https://github.com/balderdashy/waterline
  |----------------------------------------------*/

  /**
   *  Your adapters
   *  @type {object}
   */
  adapters: {
    mongo: require('sails-mongo'),
    mysql: require('sails-mysql')
  },


  /**
   *  Your connections
   *  @type {Object}
   */
  connections: {

    /* Simple mongo connection */
    myMongo: {
      adapter: 'mongo',
      host: '127.0.0.1',
      database: 'Duplex'
    }

    /* Others connections go here :) */

  }
};
