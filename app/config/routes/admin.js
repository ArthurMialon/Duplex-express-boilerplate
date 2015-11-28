import express from 'express';

/* New instance of express Router */
let router = express.Router();

export default () => {

  const prefix = "/admin";

  router.get('/', Duplex.middleware(true, 'isLogged'), Duplex.controller('admin')('profile'));

  /**
   * Return router Config
   */
  return {
    router,
    prefix
  };

};
