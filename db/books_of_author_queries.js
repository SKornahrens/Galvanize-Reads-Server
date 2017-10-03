const knex = require('./knex')

module.exports = {
  getBooksOfAuthor(id) {
    return knex.from('book')
    .select('author.author_id', 'book.title')
    .join('author_book', 'book.book_id', 'author_book.book_id')
    .join('author', 'author.author_id', 'author_book.author_id')
    .where('author.author_id', id);
  },
}
