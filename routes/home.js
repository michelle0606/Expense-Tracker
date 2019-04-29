// 首頁

const express = require("express");
const router = express.Router();
const Record = require("../models/record");

router.get("/", (req, res) => {
  const date = req.query.month ? new Date() : false;
  const category = req.query.category ? req.query.category : { $exists: true };
  Record.find({ category })
    .exec()
    .then(records => {
      let total = 0;
      records = records
        .filter(record => {
          if (date) {
            date.setMonth(Number(req.query.month) - 1); //將被選擇的月份轉換成同月份date
            return (
              record.date.toLocaleDateString().slice(0, 7) ===
              date.toLocaleDateString().slice(0, 7)
            );
          }
          return true;
        })
        .map(record => {
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
    case "其他":
      record.category = "fas fa-pen";
      break;
    default:
      break;
  }
}

module.exports = router;
