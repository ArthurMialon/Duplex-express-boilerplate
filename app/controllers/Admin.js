/**
 * Admin class
 */
export default class Admin {

  constructor() {
  }

  /**
   * Profile page
   * @param {Object} request
   * @param {Object} response
   */
  profile(req, res) {
    res.render('admin/profile.hbs', {
      user: req.user
    });
  }


}
