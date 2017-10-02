const authors = require('../seed_data/author_seed')

exports.seed = function(knex, Promise) {
  return knex('author').del()
    .then(function () {
      return knex('author').insert(authors);
    });
};
