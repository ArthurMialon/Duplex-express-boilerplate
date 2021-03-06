import express from 'express';
import init from './config/init';
import DuplexHelper from './helpers/Duplex';
import config from './config';
import io from 'socket.io';
import socket from './config/socket';

/**
 * Add Duplex Helper for all the application
 */
global.Duplex = new DuplexHelper();

/* Connection to Database */
Duplex.connectDB( err => {

  /* Init express application */
  let app = init(express());

  /* Listen */
  let server = app.listen(config.port, () => {
    console.log(`Duplex app listening at http://localhost:${config.port}`);
  });

  /* Init socket connection */
  socket(io.listen(server));

});
