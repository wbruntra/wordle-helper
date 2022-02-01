/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
  return knex.schema.createTable('word_bins', function (table) {
    table.string('word')
    table.integer('bin_size')
    table.integer('words_in_bins')
    table.float('pct_captured')
    table.string('wordlist_hash')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('word_bins')
}
