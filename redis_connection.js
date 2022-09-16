const redis = require('redis')

const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: '6380',
  retry_strategy: () => 1000,
})

redisClient.connect()

module.exports = redisClient
