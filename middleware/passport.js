
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var passport  = require('passport');
const Blogdb = require('../schema/blogdb')

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('login');
opts.secretOrKey = 'UserLoginToken';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';

/*var opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey : 'UserLoginToken'
}*/

passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
    //Blogdb.find({email: email, password: password, isactive: 1});
    const test = Blogdb.findOne({email: jwt_payload.sub}, function(err, user) {
    console.log(test);
        //User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));