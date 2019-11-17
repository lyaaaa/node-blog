const env = process.env.NODE_ENV // 环境参数

let MYSQL_CONF

let REDIS_CONF
// 开发环境下
if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'ly103512',
    port: '3306',
    database: 'myblog'
  }
  REDIS_CONF = {
    port: 6379,
    host: 'localhost'
  }
}
// 生产环境下
if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'myblog'
  }
  REDIS_CONF = {
    port: 6379,
    host: 'localhost'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
