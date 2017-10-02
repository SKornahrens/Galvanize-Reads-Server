const express = require('express')
const router = express.Router();
const queries = require('../db/authors_books_queries')


function isValidID(req, res, next ) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid author book pair'));
}

function validAuthorBook(author_book) {
  const hasAuthorID = typeof author_book.author_id == 'number';
  const hasBookID = typeof author_book.book_id == 'number';
  return hasAuthorID && hasBookID;
}

router.get('/', (req, res) => {
  queries.getAll().then(author_book => {
    res.json(author_book)
  });
});

router.get('/:id', isValidID, (req, res, next) => {
    queries.getOne(req.params.id).then(author_book => {
      if(author_book) {
        res.json(author_book);
      }
      else {
        res.status(404);
        next();
      }
  });
});

router.post('/', (req, res, next) => {
  if(validAuthorBook(req.body)) {
    queries.create(req.body).then(author_book => {
      res.json(author_book[0])
    })
  } else {
    next(new Error('Invalid author/book pair post'));
  }
})

router.put('/:id', isValidID, (req, res, next) => {
  if(validAuthorBook(req.body)) {
    queries.update(req.params.id, req.body).then(author_bookDetails => {
      res.json(author_bookDetails[0])
    })
  } else {
    next(new Error('Invalid author/book pair put'));
  }
})

router.delete('/:id', isValidID, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      delete: true
    })
  })
})

module.exports = router;
