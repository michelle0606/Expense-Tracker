const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(
  session({
    secret: "ewopir903erquj389eri3h8ids8392978ru3i2hkjwd",
    resave: "false",
    saveUninitialized: "false"
  })
);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/recorder", {
  useNewUrlParser: true,
  useCreateIndex: true
});

const db = mongoose.connection;

app.set("view engine", "pug");

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

// 連線異常
db.on("error", () => {
  console.log("mongodb error!");
});

// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/", require("./routes/home"));
app.use("/record", require("./routes/record"));
app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));

app.listen(process.env.PORT || 3000, () => {
  console.log("App is running");
});
