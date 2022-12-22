const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config");
const connectToDB = require("./db/mongodb");
// Routes
const bookRouter = require("./routes/books");
const app = express();

// connect to db
connectToDB();
// add middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/books", bookRouter);

app.get("/", (req, res) => {
  res.send("Hello Bookstore");
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  const errorStatus = err.status || 500;
  res.status(errorStatus).send(err.message);
  next();
});

app.listen(config.PORT, () => {
  console.log("server running on http://localhost:${config.PORT}");
});
