const express = require("express");
const { conectMongoDb } = require("./conection");
const path = require("path");
const { URL } = require("./model/url");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middlewara/auth");

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
app.use(checkForAuthentication);

// routes
app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlRoutes);
app.use("/user", userRoute);

// staticRoute
app.use("/", staticRoute);

app.listen(8001, () => console.log("server staerted at port 8001"));
