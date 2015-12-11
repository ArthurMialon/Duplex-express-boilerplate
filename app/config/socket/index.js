import socketioJwt from 'socketio-jwt';
import Configuration from '../';

/**
 * Configuration socket.io
 */
export default (io) => {
  console.log("Socket :: Waiting for connection");

  /**
   * Authenticate middleware :: see doc at https://github.com/auth0/socketio-jwt
   */
  io.use(socketioJwt.authorize({
    secret   : Configuration.jwt.secret,
    handshake: true
  }));

  /**
   * Routing socket.io
   */
  io.on('connection', socket => {
    console.log(socket.decoded_token.name, 'is connected...');

    /* Set all sockets in Duplex to use it in controllers */
    Duplex.io = io;
  });


};
