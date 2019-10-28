const { exec } = require('../db/mysql')
const getUser = (data) => {
  return {
    name: `${data.account}`,
    id: 1
  }
}
const registerUser = (account, password) => {
  // 返回假数据
  const s = "`password`"
  const sql = `insert into users(username,${s},realname)values('${account}', '${password}', '李四');`
  return exec(sql)
}
module.exports = {
  getUser,
  registerUser
}