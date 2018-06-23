const isAuthenticated = require("../middleware/authentication");
const express = require("express");
const route = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

route.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
    failureflash: true
  }),
  function(req, res) {
    res.redirect("/dashboard");
  }
);

route.post("/register", async (req, res) => {
  console.log(req.body);
  const User = mongoose.model("user");
  const salt = await bcrypt.genSalt(5);
  const password = await bcrypt.hash(req.body.password, salt);
  console.log(password);
  const user = new User({
    email: req.body.email,
    password
  }).save();
  res.send(user);
});

route.get("/dashboard", isAuthenticated, (req, res) => res.send("dashboard"));

route.get("/failed", (req, res) => res.send("failed" + req.isAuthenticated()));
route.get("/success", (req, res) =>
  res.send("success" + req.isAuthenticated())
);

module.exports = route;
