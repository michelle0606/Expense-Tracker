const mongoose = require("mongoose");
const Record = require("../record");
const recordList = require("./record.json").results;

mongoose.connect("mongodb://localhost/recorder", { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", () => {
  console.log("db error");
});

db.once("open", () => {
  console.log("db connected!");
  for (let i of recordList) {
    Record.create({
      name: i.name,
      category: i.category,
      date: i.date,
      amount: i.amount
    });
  }
  console.log("done");
});
