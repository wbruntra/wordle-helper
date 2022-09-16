const dbConfig = require('./knexfile')
const knex = require('knex')

const db = knex(dbConfig.development)

module.exports = db