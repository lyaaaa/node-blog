const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
// redisClient.on

function set(key, val) {
}
function get(key) {
}
