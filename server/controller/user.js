const { exec } = require('../db/mysql')
const getUser = (data, username) => {
  const s = '`password`'
  let sql
  if (username) {
    sql = `select id, username, realname from users where username='${username}';`
  } else {
    sql = `select id, username, realname from users where username='${data.account}' and ${s}='${data.password}';`
  } 
  return exec(sql)
}
const registerUser = (account, password) => {
  const s = '`password`'
  const sql = `insert into users(username,${s},realname)values('${account}', '${password}', '');`
  return exec(sql)
}
module.exports = {
  getUser,
  registerUser
}
