const mongoose = require("mongoose");

async function conectMongoDb(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("mongodb is connected"))
    .catch((err) => console.log("Mongo Error", err));
}

module.exports = {
  conectMongoDb,
};
