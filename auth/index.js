const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const helper = require('../helpers');
let serializeUser = passport.serializeUser((user, done) => {
 // console.log("serializeUser - User: " + JSON.stringify(user));
console.log("SERIALIZE");
console.log(user);
  done(null, user.uniqueId);
});
let deserializeUser = passport.deserializeUser((id, done) => {
  console.log("deserializeUser - User ID: " + id);
  helper.findById(id)
    .then((user) => {
      done(null, user);
    }).catch((error) => {
      console.log('Error when deserializing the user');
      return;
    });
})
let authProcessor = (accessToken, refreshToken, profile, done) => {
  console.log("AUTHPROCESSOR");
  console.log(accessToken);
  console.log(refreshToken);
  console.log(profile);

  helper.findOne(profile.id)
    .then((result) => {
      if(result){
        console.log('authProcessor');
        console.log(result);
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
let githubStrategy   = passport.use(new GitHubStrategy(config.github, authProcessor));

module.exports = () => {
  authProcessor,
  serializeUser,
  deserializeUser,
  facebookStrategy,
  twitterStrategy,
  githubStrategy
}
