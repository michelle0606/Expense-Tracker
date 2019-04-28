const express = require("express");
const router = express.Router();
const Record = require("../models/record");

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/", (req, res) => {
  const record = Record({
    name: req.body.name,
    userId: req.user._id
  });

  record.save(err => {
    if (err) return console.log(err);
    return res.redirect("/");
  });
});

module.exports = router;
