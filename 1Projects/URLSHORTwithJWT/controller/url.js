const { URL } = require("../model/url");
const { nanoid } = require("nanoid");
const mongoose = require("mongoose");

// POST /url -> generate short URL
async function handleGenerateNewshortURL(req, res) {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const shortId = nanoid(8);
    const result = await URL.create({
      shortId,
      redirectURL: url,
      visitHistory: [],
      createdBy: req.user._id,
    });

    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home", { url: shortId, urls: allUrls });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
}

// GET /url/:id -> redirect to original URL
async function handleRedirectURL(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId, // find the document with this shortid
    },
    {
      $push: { visitHistory: { timestamps: Date.now() } }, //add a new visit log
    },
    {
      new: true, // return the updated document
    }
  );
  if (!entry) return res.status(404).json({ error: "short URL not found" });

  //   redirect
  return res.redirect(entry.redirectURL);
}

// GET/USER/analytics/:id
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({ shortId });
  if (!entry) return res.status(404).json({ error: "short URl not found" });

  return res.json({
    totalClicks: entry.visitHistory.length,
    analytics: entry.visitHistory,
  });
}

module.exports = {
  handleGenerateNewshortURL,
  handleRedirectURL,
  handleGetAnalytics,
};
