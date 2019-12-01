const { getPostData } = require('../util/apiUtil')
const { getUser, registerUser } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/index')

const handleUserRouter = async (req, res) => {
  const method = req.method
  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    try {
      const postData = await getPostData(req)
      if (postData.account && postData.password) {
        const userData = await getUser(postData)
        // 设置sessionData
        req.session.username = userData[0].username
        return new SuccessModel(userData[0])
      }
    } catch (err) {
      return new ErrorModel('登录失败')
    }
  }
  // 注册功能
  if (method === 'POST' && req.path === '/api/user/register') {
    const { account, password } = await getPostData(req)
    return registerUser(account, password).then(() => {
      return new SuccessModel({
        msg: '注册成功'
      })
    })
  }
  // 判断登录状态
  if (method === 'GET' && req.path === '/api/user/loginCheck') {
    if (req.session.username) {
      const userInfo = await getUser('', req.session.username)
      return new SuccessModel(userInfo[0])
    }
    return new ErrorModel('尚未登录')
  }
}

module.exports = handleUserRouter
