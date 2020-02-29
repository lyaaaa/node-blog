const { secretKey } = require('../conf/constant')
const jwt = require('jsonwebtoken')

// 获取 请求 token
const getToken = (req) => {
  let token = ''
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1]
  }
  return token
}
// 校验token
const verifyToken = function(error, req, res, next) {
  const token = getToken(req)
  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.send({
          code: 401,
          message: err.message
        })
      } else {
        return next()
      }
    })
  }
  return res.send({
    code: error.status,
    message: error.message
  })
}

// 通过token返回用户信息
const getUserByToken = function (token) {
  let data
  jwt.verify(token, secretKey, (err, decoded) => {
    if (!err) {
      data = decoded.data
    } else {
      data = err
    }
  })
  return data
}

// 根据数据返回生成token
const getTokenByData = function(data) {
  return jwt.sign({ data }, secretKey, {
    expiresIn: 60 * 60 * 24 // 授权时效24小时
  })
}

module.exports = {
  getToken,
  verifyToken,
  getUserByToken,
  getTokenByData
}
