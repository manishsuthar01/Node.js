const UserRouter = require("./routes/user");
const express = require("express");
const { connectMongoDb } = require("./connection");
const { LogReqRes } = require("./middlewares");
const app = express();

// connection
connectMongoDb("mongodb://127.0.0.1:27017/youtube");

// middleware-plugin
app.use(LogReqRes("./MVC/log.txt"));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", UserRouter);


app.listen(5000, () => console.log("server is started at port 5000"));
