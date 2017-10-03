const express = require('express')
const router = express.Router();
const queries = require('../db/books_queries')


function isValidID(req, res, next ) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid book'));
}

function validBook(book) {
  const hasTitle = typeof book.title == 'string' && book.title.trim() != '';
  const hasGenre = typeof book.genre == 'string' && book.genre.trim() != '';
  const hasDescription = typeof book.description == 'string' && book.description.trim() != '';
  const hasURL = typeof book.cover_url == 'string' && book.cover_url.trim() != '';
  return hasTitle && hasGenre && hasDescription && hasURL;
}

router.get('/', (req, res) => {
  queries.getAll().then(book => {
    res.json(book)
  });
});

router.get('/:id', isValidID, (req, res, next) => {
    queries.getOne(req.params.id).then(book => {
      if(book) {
        res.json(book);
      }
      else {
        res.status(404);
        next();
      }
  });
});

router.post('/', (req, res, next) => {
  if(validBook(req.body)) {
    queries.create(req.body).then(book => {
      res.json("success")
    })
  } else {
    next(new Error('Invalid book post'));
  }
})

router.put('/:id', isValidID, (req, res, next) => {
  if(validBook(req.body)) {
    queries.update(req.params.id, req.body).then(bookDetails => {
      res.json("success")
    })
  } else {
    next(new Error('Invalid book put'));
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
