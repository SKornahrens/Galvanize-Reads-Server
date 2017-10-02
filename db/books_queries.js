const knex = require('./knex')

module.exports = {
  getAll() {
    return knex('book');
  },
  getOne(id) {
    return knex('book').where('book_id', id).first();
  },
  create(book) {
    return knex('book').insert(book, '*');
  },
  update(id, bookDetails) {
    return knex('book').where('book_id', id).update(bookDetails, '*');
  },
  delete(id) {
    return knex('book').where('book_id', id).del();
  }
}
