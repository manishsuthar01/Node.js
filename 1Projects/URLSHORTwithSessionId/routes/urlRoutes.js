const express = require("express");
const URL = require("../model/url");

const {
  handleGenerateNewshortURL,
  handleRedirectURL,
  handleGetAnalytics
} = require("../controller/url");

const router = express.Router();

// post url
router.post("/", handleGenerateNewshortURL);

// get url
router.get("/:shortId", handleRedirectURL);

// Analytics for a short URl
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
