const { exec } = require('../db/mysql')
const getUser = (data, req) => {
  const s = "`password`"
  const sql = `select * from users where username='${data.account}' and ${s}='${data.password}';`
  return exec(sql)
}
const registerUser = (account, password) => {
  const s = "`password`"
  const sql = `insert into users(username,${s},realname)values('${account}', '${password}', '李四');`
  return exec(sql)
}
module.exports = {
  getUser,
  registerUser
}