const express = require("express");
const fs = require("fs");
const zlib = require("zlib");

const app = express();
// app.use(require("express-status-monitor")());

fs.createReadStream("./sample.txt").pipe(
  zlib.createGzip().pipe(fs.createWriteStream("./sample.txt.gz"))
);

app.get("/", (req, res) => {
  const stream = fs.createReadStream("./sample.txt", "utf-8"); //64KB per chunk
  stream.pipe(res);
});

app.listen(3000, () => console.log("server is started at port 3000"));
  