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

const getBlogDetail = (id) => {
  return exec(`select * from blogs where id='${id}';`)
}

module.exports = {
  getList,
  getBlogDetail
}