const mongoose = require("mongoose");

// Define the schema
const Schema = mongoose.Schema;

// Define the book schema
const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: false,
  },
  longDescription: {
    type: String,
    required: false,
  },
  year: {
    type: Number,
    required: true,
    max: [2022, "Year cannot be greater than 2022"],
  },
  isbn: {
    type: String,
    required: true,
    unique: [true, "ISBN must be unique"],
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price cannot be less than 0"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
module.exports = mongoose.model("Book", BookSchema);
