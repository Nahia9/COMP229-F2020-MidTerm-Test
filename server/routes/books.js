  /*File Name: book.js( in routes) 
  Student Name: Nahia Akter 
  StudentID: 301106956 
  File Description: COMP229 - F2020 - MidTerm*/

  // modules required for routing
  let express = require('express');
  let router = express.Router();
  let mongoose = require('mongoose');

  // define the book model
  let book = require('../models/books');

  /* GET books List page. READ */
  router.get('/', (req, res, next) => {
    // find all books in the books collection
    book.find((err, books) => {
      if (err) {
        return console.error(err);
      } else {
        res.render('books/index', {
          title: 'Books',
          books: books
        });
      }
    });

  });

  //  GET the Book Details page in order to add a new Book
  router.get('/add', (req, res, next) => {

    res.render('books/details', {
      title: "Add a new Book",
      books: "",
      displayName: req.user ? req.user.displayName : ''
    });

  });

  // POST process the Book Details page and create a new Book - CREATE
  router.post('/add', (req, res, next) => {

    let newBook = book({
      "title": req.body.title,
      "price": req.body.price,
      "author": req.body.author,
      "genre": req.body.genre
    });

    book.create(newBook, (err, book) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/books');
      }
    });

  });

  // GET the Book Details page in order to edit an existing Book
  router.get('/edit/:id', (req, res, next) => {

    let id = req.params.id;

    // find one book by its id
    book.findById(id, (err, books) => {
      if (err) {
        console.log(err);
        res.end(error);
      } else {
        // show the book details view
        res.render('books/details', {
          title: 'Edit Book Details',
          books: books,
          displayName: req.user ? req.user.displayName : ''
        });
      }
    });
  });

  // POST - process the information passed from the details form and update the document
  router.post('/edit/:id', (req, res, next) => {

    let id = req.params.id;

    let updatedBook = book({
      "_id": id,
      "title": req.body.title,
      "price": req.body.price,
      "author": req.body.author,
      "genre": req.body.genre
    });

    book.update({
      _id: id
    }, updatedBook, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the book List
        res.redirect('/books');
      }
    });

  });

  // GET - process the delete by user id
  router.get('/delete/:id', (req, res, next) => {

    let id = req.params.id;

    book.remove({
      _id: id
    }, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the books list
        res.redirect('/books');
      }
    });
  });


  module.exports = router;