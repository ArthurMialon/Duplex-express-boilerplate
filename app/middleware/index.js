import auth from './auth';

/**
 * Export all middleware
 */
export default {

  /* These functions will be executed each time */
  each: [
    function(req, res, next) {
      console.log('execute on each request --> /app/middleware/index.js');
      next();
    }
  ],

  /* Check if user is logged */
  isLogged: [
    auth.isLogged
  ],

  /* Alias for an IP middleware */
  ip: [
    auth.ip
  ],

  /* Create other alias */
  other: [
    auth.jwt
  ]


};
