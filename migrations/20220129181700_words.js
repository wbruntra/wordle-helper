/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('words', function (table) {
    table.increments('id')
    table.string('word').unique()
    table.float('log_score')
    table.float('sqrt_score')
    table.integer('mini_max')
    table.integer('most_keys')
    // Hash is necessary because scores depend on wordlist
    table.string('wordlist_hash')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('words')
}
