/**
 * Auth class
 */
export default class Auth {

  constructor() {
  }

  /**
   * Login index
   * @param {Object} request
   * @param {Object} response
   */
  login(req, res) {
    res.render('pages/login.hbs');
  }

  /**
   * Sign up page
   * @param {Object} request
   * @param {Object} response
   */
  signup(req, res) {
    res.render('pages/signup.hbs');
  }

  /**
   * Logout
   * @param {Object} request
   * @param {Object} response
   */
  logout(req, res, next) {
    req.logout();
    res.redirect('/');
  }

}
