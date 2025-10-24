const express = require("express");
const { conectMongoDb } = require("./conection");
const path = require("path");
const { URL } = require("./model/url");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewara/auth");

const urlRoutes = require("./routes/urlRoutes");
const staticRoute = require("./routes/staticroute");
const userRoute = require("./routes/userRoute");

const app = express();
// db connection
conectMongoDb("mongodb://localhost:27017/short-url");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/url", restrictToLoggedinUserOnly, urlRoutes);
app.use("/user", userRoute);

// staticRoute
app.use("/", checkAuth, staticRoute);

app.listen(8001, () => console.log("server staerted at port 8001"));
