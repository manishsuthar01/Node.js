const http = require("http");
const fs = require("fs");
// const { url } = require("inspector");
const url = require("url");

const Myserver = http.createServer((req, res) => {
  const log = `${Date.now().toLocaleString()}: ${
    req.url
  } --> new request received \n`;
  fs.appendFile("./HTTPS/log.txt", log, (e, data) => {
    const myurl = url.parse(req.url, true);
    switch (myurl.pathname) {
      case "/":
        res.end("HomePage");
        break;
      case "/contact":
        const dp = myurl.query.name;
        res.end(`contactPage ,hii ${dp}`);
        break;
      case "/about":
        res.end("AboutPage");
        break;
      default:
        res.end("404 not found");
    }
  });
});

Myserver.listen(4000);
