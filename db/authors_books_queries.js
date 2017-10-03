const knex = require('./knex')

module.exports = {
  getAll() {
    return knex('author_book');
  },
  getOne(id) {
    return knex('author_book').where('author_book_pair', id).first();
  },
  create(author_book) {
    return knex('author_book').insert(author_book, '*');
  },
  update(id, author_bookDetails) {
    return knex('author_book').where('author_book_pair', id).update(author_bookDetails, '*');
  },
  delete(id) {
    return knex('author_book').where('author_book_pair', id).del();
  },
}
