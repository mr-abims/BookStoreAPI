const express = require("express");
const BookValidationMW = require("../validators/book.validator");
const bookModel = require("../models/books");

const bookRouter = express.Router();

bookRouter.get("/", (req, res) => {
  bookModel
    .find()
    .then((books) => {
      res.send(books);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

bookRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  bookModel
    .findById(id)
    .then((book) => {
      res.status(200).send(book);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

bookRouter.post("/", BookValidationMW, (req, res) => {
  const book = req.body;
  book.lastModified = Date.now();
  bookModel
    .create(book)
    .then((book) => {
      res.status(201).send(book);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

bookRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const book = req.body;
  book.lastModified = Date.now();
  bookModel
    .findByIdAndUpdate(id, book, { new: true })
    .then((newBook) => {
      res.status(200).send(newBook);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

bookRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  bookModel
    .findByIdAndDelete(id)
    .then((book) => {
      res.status(200).send(book);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

module.exports = bookRouter;
