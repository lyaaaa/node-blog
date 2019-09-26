const { getList } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/index')

const handleBlogRouter = (req, res) => {
  const method = req.method
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const list = getList()
    return new SuccessModel(list)
  }
}

module.exports = handleBlogRouter
