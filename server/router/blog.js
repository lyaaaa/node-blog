const express = require('express')
const router = express.Router()
const { SuccessModel, ErrorModel } = require('../model/index')
const { getList, getBlogDetail, addBlog } = require('../controller/blog')
const { getToken, getUserByToken, getTokenByData } = require('../util/token')
const { getNowTime } = require('../util/time')

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

// 编辑博客详情

// 新建博客详情
router.post('/api/blog/add', async (req, res) => {
  const token = getToken(req)
  const user = getUserByToken(token)
  const blog = {
    title: req.body.title,
    content: req.body.content,
    contentHtml: req.body.contentHtml,
    createtime: getNowTime(),
    author: user.username
  }
  console.log('blog', blog)
  const data = await addBlog(blog)
  res.send(new SuccessModel(data))
})

module.exports = router
