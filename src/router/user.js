const { getPostData } = require('../util/apiUtil')
const { getUser } = require('../controller/user')
const { SuccessModel, ErrorMode } = require('../model/index')

const handleUserRouter = (req, res) => {
  const method = req.method
  if (method === 'POST' && req.path === '/api/user/login') {
    return getPostData(req).then(data => {
      const userData = getUser()
      return new SuccessModel(userData)
    })
  }
}

module.exports = handleUserRouter
