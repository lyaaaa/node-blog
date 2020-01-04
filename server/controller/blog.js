const { exec } = require('../db/mysql')
const getList = (username) => {
  let sql
  if (username) {
    sql = `select * from blogs where author='${username}';`
  } else {
    sql = 'select * from blogs;'
  }
  return exec(sql)
}

module.exports = {
  getList
}