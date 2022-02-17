/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
  return knex.schema.createTable('word_scores', function (table) {
    table.increments('id')
    table.string('wordlist_hash')
    table.float('log_score')
    table.float('sqrt_score')
    table.integer('mini_max')
    table.integer('most_keys')
    table.integer('weighted_score')
    table.integer('equal_weight_score')
    
    table.integer('word_id').unsigned().notNullable()
    table.foreign('word_id').references('id').inTable('words').onDelete('CASCADE')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('word_scores')
}
