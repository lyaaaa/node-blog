const env = process.env.NODE_ENV // 环境参数

let MYSQL_CONF
// 开发环境下
if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'selfpassword',
    port: '3306',
    database: 'myblog'
  }
}
// 生产环境下
if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'selfpassword',
    port: '3306',
    database: 'myblog'
  }
}

module.exports = {
  MYSQL_CONF
}
