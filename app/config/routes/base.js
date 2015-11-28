import express from 'express';

/* New instance of express Router */
let router = express.Router();

export default () => {

  const prefix = "/";

  /* Homepage */
  router.get('/', Duplex.controller('base')('index'));

  /* Authentication pages */
  router.get('/signup', Duplex.controller('auth')('signup'));
  router.get('/login',  Duplex.controller('auth')('login'));
  router.get('/logout', Duplex.controller('auth')('logout'));

  /* Authentication actions */
  router.post('/login', Duplex.passport.authenticate('local-login', {
    successRedirect : '/admin',
    failureRedirect : '/login'
  }));

 router.post('/signup', Duplex.passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup'
  }));

  /* Route not found */
  router.get('*',  Duplex.controller('base')('notFound'));
  router.post('*', Duplex.controller('base')('notFound'));

  /**
   * Return router Config
   */
  return {
    router,
    prefix
  };

};
