const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("../Config/keys.config");

const User = require("../API/User/user.model");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: keys.GOOGLE_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        const subdomain = profile._json.email.split("@")[1];
        if (subdomain !== "tothenew.com") {
          done(null, null);
        } else {
          console.log(profile);
          User.findOne({ email: profile._json.email }).then((existingUser) => {
            if (existingUser) {
              done(null, existingUser);
            } else {
              const newUser = new User({
                email: profile._json.email,
                name: profile._json.name,
                profilePic: profile._json.picture
              });
              newUser.save().then((newUser) => {
                console.log(newUser);
                done(null, newUser);
              });
            }
          });
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((e) => {
        done(new Error("Failed to deserialize an user"));
      });
  });
};
