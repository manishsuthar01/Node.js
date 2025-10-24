const express = require("express");
const { URL } = require("../model/url");

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("login");

  const shortId = req.query.id || null;
  const allurl = await URL.find({ createdBy: req.user._id });
  res.render("home", { url: shortId, urls: allurl });
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login");
}); 
module.exports = router;
