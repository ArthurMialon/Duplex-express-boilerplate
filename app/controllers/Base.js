/**
 * Base class
 */
export default class Base {

  constructor() {
    this.message      = "Welcome on Duplex homepage :)";
    this.errorMessage = "Page not Found";
    this.user         = Duplex.model('user');
  }

  /**
   * Action index
   * @param {Object} request
   * @param {Object} response
   */
  index(req, res) {
    res.render('pages/index.hbs', { message: this.message});
  }

  /**
   * Not found request
   * @param {Object} request
   * @param {Object} response
   */
  notFound(req, res) {
    res.render('pages/404.hbs', { message: this.errorMessage});
  }

}
