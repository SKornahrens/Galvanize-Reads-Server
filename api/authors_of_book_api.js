const express = require('express')
const router = express.Router();
const queries = require('../db/authors_of_book_queries')


function isValidID(req, res, next ) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid author book pair'));
}

router.get('/:id', isValidID, (req, res, next) => {
    queries.getAuthorsOfBook(req.params.id).then(author_book => {
      if(author_book) {
        res.json(author_book);
      }
      else {
        res.status(404);
        next();
      }
  });
});


module.exports = router;
