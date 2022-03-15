const express = require("express");
const fs = require("fs");
const books = require("./books.json");
const uuid = require("uuid");
const app = express();
app.listen(8000);
app.use(express.json());

app.use((req, res, next) => {
  req.api_requested_by = "Karthik S M";
  next();
});

app.get("/", (req, res) => {
  const api_requested_by = req.api_requested_by;
  res.json({
    api_requested_by: api_requested_by,
    books: books,
  });
});

app.get("/books/:id", (req, res) => {
  const api_requested_by = req.api_requested_by;
  const id = +req.params.id;
  const book = books.find((item) => item.id == id);
  res.json({
    api_requested_by: api_requested_by,
    books: book,
  });
});

app.post("/books", (req, res) => {
  const api_requested_by = req.api_requested_by;
  books.push(req.body);
  fs.writeFileSync(`${__dirname}/books.json`, JSON.stringify(books));
  res.json({
    api_requested_by: api_requested_by,
    books: req.body,
  });
});

app.patch("/books/:id", (req, res) => {
  const api_requested_by = req.api_requested_by;
  const id = +req.params.id;
  const find_book = books.find((item) => item.id == id);
  const update_book = Object.assign(find_book, req.body);
  res.json({
    api_requested_by: api_requested_by,
    books: update_book,
  });
});

app.delete("/books/:id", (req, res) => {
  const api_requested_by = req.api_requested_by;
  const id = +req.params.id;
  const delete_book = books.findIndex((item) => item.id === id);
  books.splice(delete_book, 1);
  res.json({
    api_requested_by: api_requested_by,
    books: books,
  });
});
