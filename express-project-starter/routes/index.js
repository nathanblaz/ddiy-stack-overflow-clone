var express = require("express");
var router = express.Router();
const { requireAuth } = require("../auth");
const db = require("../db/models");
/* GET home page. */
router.get("/", async (req, res) => {
  const questions = await db.Question.findAll({ limit: 10 });
  console.log(questions);
  // res.send(questions);
  res.render("index", { title: "DDIY Overflow", questions });
});

router.get("/testingAuth", requireAuth, (req, res) => {
  res.send("You are logged in buddy");
});

module.exports = router;
