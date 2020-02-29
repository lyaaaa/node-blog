const express = require('express')
const router = express.Router()
const { SuccessModel, ErrorModel } = require('../model/index')
const { getList } = require('../controller/blog')
const { getToken, getUserByToken, getTokenByData } = require('../util/token')

// 获取博客列表
router.get('/api/blog/list',async (req, res) => {
  const list = await getList()
  res.send(new SuccessModel(list))
})

// 获取我的博客列表
router.get('/api/blog/myblog', async (req, res) => {
  const token = getToken(req)
  const user = getUserByToken(token)
  const list = await getList(user.username)
  res.send(new SuccessModel(list))
})

module.exports = router
