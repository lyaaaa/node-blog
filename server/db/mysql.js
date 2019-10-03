const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始链接
con.connect()

// 统一执行sql函数
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
}

module.exports = {
  exec
}
