const express = require('express')
const router = express.Router()
const { SuccessModel, ErrorModel } = require('../model/index')
const { getUser, registerUser } = require('../controller/user')
const { getToken, getUserByToken, getTokenByData } = require('../util/token')

// 用户登录
router.post('/api/user/login', async (req, res) => {
  try {
    const user = await getUser(req.body)
    const token = getTokenByData(user)
    user.token = token
    res.send(new SuccessModel(user))
  } catch (err) {
    res.send(new ErrorModel(err))
  }
})

// 获取用户信息
router.get('/api/user/getUser', (req, res) => {
  const token = getToken(req)
  const user = getUserByToken(token)
  if (user.id) {
    res.send(new SuccessModel(user))
  } else {
    res.send({
      code: 401,
      message: user.message
    })
  }
})

// 用户注册
router.post('/api/user/register', async (req, res) => {
  try {
    const data = await registerUser(req.body)
    res.send(new SuccessModel(data))
  } catch (err) {
    res.send(new ErrorModel(err))
  }
})

module.exports = router
