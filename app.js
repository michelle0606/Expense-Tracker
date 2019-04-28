const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/recorder", {
  useNewUrlParser: true,
  useCreateIndex: true
});

const db = mongoose.connection;

app.set("view engine", "pug");

// 連線異常
db.on("error", () => {
  console.log("mongodb error!");
});

// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/", require("./routes/home"));
// app.use("/record", require("./routes/record"));
// app.use("/user", require("./routes/user"));

app.listen(3000, () => {
  console.log("App is running!");
});
