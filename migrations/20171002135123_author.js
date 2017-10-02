
exports.up = function(knex, Promise) {
  return knex.schema.createTable('author', (table => {
    table.increments('author_id').primary()
    table.text("first_name")
    table.text("last_name")
    table.text("biography")
    table.text("potrait_url")
  }))

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('author')
};
