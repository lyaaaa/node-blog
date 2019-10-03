const { exec } = require('../db/mysql')
const getList = () => {
  // 返回假数据
  const sql = 'select * from blogs;'
  return exec(sql)
}

module.exports = {
  getList
}