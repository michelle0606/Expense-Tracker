const mongoose = require("mongoose");
const Record = require("../record");
const recordList = require("./record.json").results;
const User = require("../user");
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb://localhost/recorder", { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
  const user = User({
    name: "test",
    email: "test1@gmail.com",
    password: "test1"
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      user.save().then(user => {
        recordList.map(recordList => {
          Record.create({ ...recordList, userId: user._id });
        });
      });
    });
  });
  console.log("done!");
});
