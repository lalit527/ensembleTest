const passport = require('passport');
const facebookTokenStrategy = require('passport-facebook-token');
const user = require('mongoose').model('User');

module.exports = function() {
    passport.use(new facebookTokenStrategy({
        clientID: '225683797942567',
        clientSecret: 'f51da1d53ddbae5199655fe3af7113e6'
    }, function (accessToken, refreshToken, profile, done) {
        /*User.upsertFbUser(accessToken, refreshToken, profile, (err, result) => {
            return done(err, result);
        });*/
        console.log(profile);
        return new Promoiser((resolve, reject) => {
            resolve(done('', profile));
        });
        
    }));
}