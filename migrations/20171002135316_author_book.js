
exports.up = function(knex, Promise) {
  return knex.schema.createTable('author_book', (table => {
    table.increments('author_book_pair').primary()
    table.integer("author_id")
      .references("author.author_id")
      .onDelete("CASCADE")
    table.integer("book_id")
    .references("book.book_id")
    .onDelete("CASCADE")
  }))
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('author_book')
};
