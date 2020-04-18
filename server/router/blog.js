const express = require('express')
const router = express.Router()
const { SuccessModel, ErrorModel } = require('../model/index')
const { getList, getBlogDetail } = require('../controller/blog')
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

// 获取博客详情
router.get('/api/blog/detail', async (req, res) => {
  const detail = await getBlogDetail(req.query.id)
  if (detail.length) {
    res.send(new SuccessModel(detail[0]))
  } else {
    res.send(new ErrorModel('找不到详情'))
  }
})

module.exports = router
