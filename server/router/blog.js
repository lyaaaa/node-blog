const { getList } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/index')

const handleBlogRouter = (req, res) => {
  const method = req.method
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    return getList().then(list => {
      return new SuccessModel(list)
    })
  }
  // 获取我的博客
  if (method === 'GET' && req.path === '/api/blog/myblog') {
    return getList(req.session.username).then(list => {
      return new SuccessModel(list)
    })
  }
}

module.exports = handleBlogRouter
