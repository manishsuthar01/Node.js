const express = require("express");
const path = require("path");
const multer = require("multer");

// const upload = multer({ dest: "MulterNODEjS/uploads/" }); // jo bhi file upload hogi usko upload folder me dal do
// upload ne data corrupt kr diya,iske liye hm diskStorage use krte hai

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "MulterNODEjS/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    console.log(file.size);
    cb(null, file.originalname + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },
});

const app = express();

//ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/upload", (req, res) => {
  upload.single("profileImage")(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).send("File too large. Max size is 2MB.");
      }
      return res.status(400).send("Error uploading file.");
    }
    console.log(req.file);
    res.redirect("/");
  });
});

// server port
app.listen(3002, () => {
  console.log("server is started at port 3002");
});
