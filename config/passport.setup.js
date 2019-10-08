const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const config = require("config");

const SocialUser = require("../models/SocialUser");
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  SocialUser.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "http://127.0.0.1:3000/auth/google/redirect",
      clientID: config.get("google.GOOGLE_CONSUMER_KEY"),
      clientSecret: config.get("google.GOOGLE_CONSUMER_SECRET")
    },
    (accessToken, refreshToken, profile, done) => {
      //Check if user exists on db
      SocialUser.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          done(null, currentUser);
        } else {
          new SocialUser({
            username: profile.displayName,
            name: profile.name.givenName,
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
            socialId: profile.id,
            rating: "0",
            status: "active"
          })
            .save()
            .then(newSocialUser => {
              return done(null, newSocialUser);
            });
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: config.get("facebook.FACEBOOK_APP_ID"),
      clientSecret: config.get("facebook.FACEBOOK_APP_SECRET"),
      callbackURL: "http://127.0.0.1:3000/auth/facebook/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      //Check if user exists on db
      SocialUser.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          done(null, currentUser);
        } else {
          new SocialUser({
            username: profile.displayName,
            name: profile.name.firstName,
            lastname: profile.name.lastName,
            email: profile.email,
            socialId: profile.id,
            rating: "0",
            status: "active"
          })
            .save()
            .then(newSocialUser => {
              return done(null, newSocialUser);
            });
        }
      });
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, done) {
      User.findOne({ email: email }, function(err, User) {
        if (err) {
          console.log(err);
          return done(err);
        }
        try {
          if (!User) {
            console.log("User not found");
            return done(null, false, {
              msg: "This username is not registered"
            });
          }

          //bcrypt Check
          bcrypt.compare(password, User.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              return done(null, User);
            } else {
              return done(null, false, { msg: "Incorrect credentials" });
            }
          });
        } catch (err) {
          console.log(err.msessage);
          return done(err);
        }
      });
    }
  )
);
