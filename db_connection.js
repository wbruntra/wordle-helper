import dbConfig from './knexfile'
import knex from 'knex'

const db = knex(dbConfig.development)

export default db