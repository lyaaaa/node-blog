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
        const userData = await getUser(postData, req)
        return new SuccessModel(userData)
      }
    } catch(err) {
      console.log('err', err)
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
}

module.exports = handleUserRouter
