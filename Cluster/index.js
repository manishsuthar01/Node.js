const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.json({ message: `hello from Express Server ${process.pid} `});
});

app.listen(3000, () => console.log("server is started at port 3000"));
