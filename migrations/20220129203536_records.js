/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('records', function (table) {
    table.increments('id')
    table.string('starting_word')
    table.string('answer')
    table.integer('guesses')
    table.string('method')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('records')
}
