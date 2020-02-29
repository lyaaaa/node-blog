const { exec } = require('../db/mysql')
const getUser = (data, username) => {
  const s = '`password`'
  let sql
  if (username) {
    sql = `select id, username, realname from users where username='${username}';`
  } else {
    sql = `select id, username, realname from users where username='${data.account}' and ${s}='${data.password}';`
  }
  return new Promise(async (resolve, reject) => {
    const user = await exec(sql)
    if (user.length === 0) {
      reject('账号或密码错误')
    } else if (user.length === 1) {
      resolve(user[0])
    } else {
      resolve(user)
    }
  })
}
const registerUser = ({ account, password }) => {
  const s = '`password`'
  return new Promise(async (resolve, reject) => {
    const curUserSql = `select id, username, realname from users where username='${account}';`
    const curUser = await exec(curUserSql)
    if (curUser.length) {
      reject('该账号已被注册')
      return
    }
    const sql = `insert into users(username,${s},realname)values('${account}', '${password}', '');`
    const data = await exec(sql)
    resolve(data)
  })
}
module.exports = {
  getUser,
  registerUser
}
