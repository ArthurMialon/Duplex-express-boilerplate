/**
 * Export middleware functions
 */
export default {

  /**
   * Is logged
   * @param {Object} request
   * @param {Object} response
   * @param {function} nexr
   */
  isLogged(req, res, next) {
    /* if user is authenticated in the session, carry on */
    if (req.isAuthenticated()) {
      return next();
    }

    /* Else redirect them to the home page */
    res.redirect('/');
  },

  /**
   * Check with IP address
   * @param {Object} request
   * @param {Object} response
   * @param {function} nexr
   */
  ip(req, res, next) {
    /* Check the ip address */
  },

  /**
   * JSON Web Token based authentication
   * @param {Object} request
   * @param {Object} response
   * @param {function} nexr
   */
  jwt(req, res, next) {
    /* Easy token authentication */
  }

};
