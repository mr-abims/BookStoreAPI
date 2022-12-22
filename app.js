const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config");
const connectToDB = require("./db/mongodb");

const app = express();

// connect to db
connectToDB();
// add middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello Bookstore");
});
app.listen(config.PORT, () => {
  console.log("server running on http://localhost:${config.PORT}");
});
