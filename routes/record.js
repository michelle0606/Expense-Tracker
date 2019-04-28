const express = require("express");
const router = express.Router();
const Record = require("../models/record");

// 新增頁面
router.get("/new", (req, res) => {
  res.render("new");
});

// 儲存新增
router.post("/", (req, res) => {
  const record = Record(req.body);
  console.log(req.body);

  record.save(err => {
    if (err) return console.log(err);
    return res.redirect("/");
  });
});

// 編輯頁面
router.get("/:id/edit", (req, res) => {
  Record.findById({ _id: req.params.id }, (err, record) => {
    if (err) return console.error(err);
    return res.render("edit", { record });
  });
});

// 儲存編輯
router.post("/", (req, res) => {
  Record.findById({ _id: req.params.id }, (err, record) => {
    if (err) return console.error(err);
    Object.assign(record, req.body);

    record.save(err => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

module.exports = router;
