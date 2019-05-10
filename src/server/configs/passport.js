import passport from 'passport';
import LocalStrategy from 'passport-local';
import * as model from '../model';

passport.use(
  new LocalStrategy({ usernameField: 'id', passwordField: 'password' }, async (id, password, done) => {
    let user;
    try {
      user = await model.getUser(id);
    } catch (err) {
      return done(err);
    }
    if (!user || user.password !== password) {
      return done(null, false);
    }
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, { id });
});

export default passport;
