const { getPostData } = require('../util/apiUtil')
const { getUser } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/index')

const handleUserRouter = (req, res) => {
  const method = req.method
  if (method === 'POST' && req.path === '/api/user/login') {
    return getPostData(req).then(data => {
      if (data.account && data.password) {
        const userData = getUser(data)
        return new SuccessModel(userData)
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }
}

module.exports = handleUserRouter
