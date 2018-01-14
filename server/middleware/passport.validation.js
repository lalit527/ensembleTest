const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const user = require('mongoose').model('User');

module.exports = function() {
    console.log('here');
    passport.use(new FacebookStrategy({
        clientID: '225683797942567',
        clientSecret: 'f51da1d53ddbae5199655fe3af7113e6',
        callbackURL: 'http://localhost:3000/user/login/facebook/callback'
    }, function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        user.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
            return done(err, user);
        });
        
    }));
}