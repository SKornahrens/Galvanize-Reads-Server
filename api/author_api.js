const express = require('express')
const router = express.Router();
const queries = require('../db/authors_queries')


function isValidID(req, res, next ) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid author'));
}

function validAuthor(author) {
  const hasFirstName = typeof author.first_name == 'string' && author.first_name.trim() != '';
  const hasLastName = typeof author.last_name == 'string' && author.last_name.trim() != '';
  const hasBiography = typeof author.biography == 'string' && author.biography.trim() != '';
  const hasURL = typeof author.potrait_url == 'string' && author.potrait_url.trim() != '';
  return hasFirstName && hasLastName && hasBiography && hasURL;
}

router.get('/', (req, res) => {
  queries.getAll().then(author => {
    res.json(author)
  });
});

router.get('/:id', isValidID, (req, res, next) => {
    queries.getOne(req.params.id).then(author => {
      if(author) {
        res.json(author);
      }
      else {
        res.status(404);
        next();
      }
  });
});

router.post('/', (req, res, next) => {
  if(validAuthor(req.body)) {
    queries.create(req.body).then(author => {
      res.json("success")
    })
  } else {
    next(new Error('Invalid author post'));
  }
})

router.put('/:id', isValidID, (req, res, next) => {
  if(validAuthor(req.body)) {
    queries.update(req.params.id, req.body).then(authorDetails => {
      res.json("success")
    })
  } else {
    next(new Error('Invalid author put'));
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
