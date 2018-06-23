const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async function(username, password, done) {
    console.log(username);
    const User = mongoose.model("user");
    const user = await User.findOne({
      email: username
    });
    console.log(user);
    if (!user) return done(null, false, { message: "invalid user" });

    const isPasswordMatch = await bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch)
      return done(null, false, { message: "invalid username/password" });

    done(null, user);
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  const User = mongoose.model("user");
  const user = await User.findById(id);
  if (!user)
    return done(null, false, { message: "Please login to the system." });
  done(null, user);
});
