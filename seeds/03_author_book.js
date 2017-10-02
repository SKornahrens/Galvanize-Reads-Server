const authors_books = require('../seed_data/author_book_seed')

exports.seed = function(knex, Promise) {
  return knex('author_book').del()
    .then(function () {
      return knex('author_book').insert(authors_books);
    });
};
