const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("home page");
});
app.get("/about", (req, res) => {
  return res.send("About page ,hey  "+ req.query.name);
});
app.get("/contact", (req, res) => {
  return res.end("contact page");
});
app.listen(3000);
