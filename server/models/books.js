let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
  title: String,
  price: String,
  author: String,
  genre: String
}, {
  collection: "books"
});

module.exports = mongoose.model('books', Book);