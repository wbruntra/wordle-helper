/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
  return knex.schema.alterTable('records', (table) => {
    table.index(['starting_word', 'answer', 'method'])
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('records', (table) => {
    table.dropIndex(['starting_word', 'answer', 'method'])
  })
}
