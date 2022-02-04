/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('cached_evaluations', (table) => {
    table.index(['wordlist_hash', 'method'])
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('cached_evaluations', (table) => {
    table.dropIndex(['wordlist_hash', 'method'])
  })
}
