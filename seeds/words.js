const wordList = require('../results/common-plus-official.json')
const md5 = require('md5')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
  // const wordlist_hash = md5(JSON.stringify(wordList))
  // Deletes ALL existing entries
  return knex('words')
    .del()
    .then(async function () {
      const entries = wordList.map((word) => {
        return {
          word,
          // wordlist_hash,
        }
      })
      const batches = Math.ceil(entries.length / 400)
      let entry_batch
      for (let i = 0; i < batches; i++) {
        entry_batch = entries.slice(i * 400, (i + 1) * 400)
        await knex('words').insert(entry_batch)
      }
    })
}
