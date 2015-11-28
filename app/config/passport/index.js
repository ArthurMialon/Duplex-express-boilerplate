import {Strategy} from 'passport-local';

export default (passport) => {

  let User = Duplex.model('user');

  /**
   *  =======================================
   *   Tell passport how to serialize User
   *  =======================================
   */

  /* Used to serialize the user */
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  /* Used to deserialize the user */
  passport.deserializeUser((id, done) => {
    User.findOne({ id: id }).exec( (err, user) => {
      done(err, user);
    });
  });

  /**
   *  =======================================
   *   Sign Up Stategy
   *  =======================================
   */

  passport.use('local-signup', new Strategy({
    usernameField    : 'email',
    passwordField    : 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    process.nextTick( () => {

      User.findOne({email: email}).exec( (err, user) => {
        if (err) {
          return done(err);
        }

        /* User already exist */
        if (user) {
          return done(null, false, { message: `User with: ${email} already exist.` });
        }

        /* Create the new user */
        let newUser = User.create({ email: email, password: password })
        .then( user => {
          return done(null, user);
        }).catch( err => {
          throw err;
        });
      });
    });
  }));

   /**
    *  =======================================
    *   Login Stategy
    *  =======================================
    */

  passport.use('local-login', new Strategy({
    usernameField     : 'email',
    passwordField     : 'password',
    passReqToCallback : true
  }, (req, email, password, done) => {

    User.findOne({ email: email }).exec( (err, user) => {
      // if there are any errors, return the error before anything else
      if (err) {
        return done(err);
      }

      // if no user is found, return the message
      if (!user) {
        return done(null, false, {message: 'No user found.' });
      }

      if (!user.validPassword(password)) {
        return done(null, false, {message: 'Wrong password.' });
      }

      return done(null, user);
    });

  }));

};
