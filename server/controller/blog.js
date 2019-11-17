const { exec } = require('../db/mysql')
const getList = () => {
  const sql = 'select * from blogs;'
  return exec(sql)
}

module.exports = {
  getList
}