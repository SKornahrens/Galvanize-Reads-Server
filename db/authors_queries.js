const knex = require('./knex')

module.exports = {
  getAll() {
    return knex('author');
  },
  getOne(id) {
    return knex('author').where('author_id', id).first();
  },
  create(author) {
    return knex('author').insert(author, '*');
  },
  update(id, authorDetails) {
    return knex('author').where('author_id', id).update(authorDetails, '*');
  },
  delete(id) {
    return knex('author').where('author_id', id).del();
  }
}
