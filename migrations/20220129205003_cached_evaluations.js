/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
  return knex.schema.createTable('cached_evaluations', function (table) {
    table.increments('id')
    table.string('best_word')
    table.float('score')
    table.string('wordlist_hash')
    table.string('method')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('cached_evaluations')
}
