const passport = require('passport');
require('./strategies/local.strategy');

module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null,user.id);
    });
    
    passport.deserializeUser((user, done) => {
        
        done(null, user);
    });

}