const express = require("express");
const cluster = require("node:cluster");
const os = require("os");

const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
} else {
  // Workers can share any TCP connection
  //   make my express server
  const app = express();
  const PORT = 3000;
  app.get("/", (req, res) => {
    return res.json({ message: `hello from Express Server ${process.pid} ` });
  });
  app.listen(3000, () => console.log("server is started at port 3000"));

  console.log(`Worker ${process.pid} started`);
}
