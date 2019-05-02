// 首頁

const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const { authenticated } = require("../config/auth");

router.get("/", authenticated, (req, res) => {
  const start = req.query.month ? new Date() : false;
  const end = req.query.month ? new Date() : false;
  const category = req.query.category ? req.query.category : { $exists: true };
  if (start && end) {
    start.setMonth(Number(req.query.month - 1), [1]);
    end.setMonth(Number(req.query.month - 1), [31]);
    start.setHours(0);
    end.setHours(0);
    start.setMinutes(0);
    end.setMinutes(0);
    date = {
      $gte: start,
      $lte: end
    };
  } else {
    date = { $exists: true };
  }

  Record.find({ userId: req.user._id, category, date })
    .exec()
    .then(records => {
      let total = 0;
      records = records.map(record => {
        total += record.amount;
        setIcon(record);
        return record;
      });
      res.render("index", {
        records,
        total,
        select: { month: req.query.month, category: req.query.category }
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;

function setIcon(record) {
  switch (record.category) {
    case "家居物業":
      record.category = "fas fa-home";
      break;
    case "交通出行":
      record.category = "fas fa-shuttle-van";
      break;
    case "休閒娛樂":
      record.category = "fas fa-grin-beam";
      break;
    case "餐飲食品":
      record.category = "fas fa-utensils";
      break;
    case "其它":
      record.category = "fas fa-pen";
      break;
    default:
      break;
  }
}

module.exports = router;
