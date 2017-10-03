const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

const authors = require('./api/author_api')
const books = require('./api/book_api')
const authors_books = require('./api/author_book_api')
const books_of_author = require('./api/books_of_author_api')
const authors_of_book = require('./api/authors_of_book_api')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/authors', authors);
app.use('/api/books', books);
app.use('/api/authors_books', authors_books);
app.use('/api/books_of_author', books_of_author);
app.use('/api/authors_of_book', authors_of_book);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
  console.error(err);
});

module.exports = app;
