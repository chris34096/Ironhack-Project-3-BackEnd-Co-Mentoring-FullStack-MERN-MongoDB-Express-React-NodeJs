const JwtStrategy =require('passport-jwt').Strategy;
const ExactJwt = require ('passport-jwt').ExtractJwt;
const mongoose = require ('mongoose');
const User = require('../models/user');
const keyJwt = require('./keys').secretKey;

const opts = {}
opts.jwtFromRequest =ExactJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keyJwt;

module.exports = passport => {
passport.use(new JwtStrategy(opts, (jwt_payload,done) => {
User.findById(jwt_payload.userId,"lastName firstName email")
.then(user => {
  if(user){
    return done(null,user)
  }
  return done(null,false)
})
.catch(err => console.log(err))
}))
}

// const user = jwt_payload.userId
// return done(null,user)}))}