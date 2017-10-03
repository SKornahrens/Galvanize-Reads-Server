const knex = require('./knex')

module.exports = {
  getAuthorsOfBook(id) {
    return knex.from('author')
    .select('author.first_name', 'author.last_name')
    .join('author_book', 'author.author_id', 'author_book.author_id')
    .join('book', 'book.book_id', 'author_book.book_id')
    .where('book.book_id', id);
  },
}
