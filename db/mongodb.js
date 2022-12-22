const mongoose = require("mongoose");
const config = require("../config/config");

function connectToDB() {
  mongoose.connect(config.MONGODB_URI);
  mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected");
  });
  mongoose.connection.on("error", (err) => {
    console.log("Mongoose connection error: ", err);
  });
}

module.exports = connectToDB;
