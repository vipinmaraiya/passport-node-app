const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const { user } = require("./routes");

mongoose.connect(
  "mongodb://localhost/playground",
  () => console.log("connect to database")
);

require("./models/User");
require("./services/passport");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, "public")));

app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", user);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "src/index.html"))
);

app.listen(3000, () => console.log("Server is listening on PORT 3000"));
