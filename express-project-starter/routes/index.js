var express = require("express");
var router = express.Router();
const { requireAuth } = require("../auth");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "DDIY Overflow" });
});

router.get("/testingAuth", requireAuth, (req, res) => {
  res.send("You are logged in buddy");
});

module.exports = router;
