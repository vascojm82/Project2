const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const firebase = require('../db/firebase.js');
const helper = require('../helpers');

let serializeUser = passport.serializeUser((user, done) => {
  done(null, user.uniqueId);
});

let deserializeUser = passport.deserializeUser((id, done) => {
  console.log("User ID: " + id);
  helper.findById(id)
    .then((user) => {
      done(null, user);
    }).catch((error) => {
      console.log('Error when deserializing the user');
    });
})

let authProcessor = (accessToken, refreshToken, profile, done) => {
  helper.findOne(profile.id)
    .then((result) => {
      if(result){
        done(null, result);
      } else{
        helper.createNewUser(profile)
          .then((user) => {
            console.log("New User on Auth Module: " + JSON.stringify(user));
            done(null, user);
          })
          .catch((error) => {
            console.log('Error when creating new user');
          });
      }
    });
}

let facebookStrategy = passport.use(new FacebookStrategy(config.fb, authProcessor));
let twitterStrategy  = passport.use(new TwitterStrategy(config.twitter, authProcessor));

console.log(config.fb);
console.log(config.twitter);

module.exports = () => {
  authProcessor,
  serializeUser,
  deserializeUser,
  facebookStrategy,
  twitterStrategy
}
