const books = require('../seed_data/book_seed')

exports.seed = function(knex, Promise) {
  return knex('book').del()
    .then(function () {
      return knex('book').insert(books);
    });
};
