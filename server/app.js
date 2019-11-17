const handleBlogRouter = require('./router/blog')
const handleUserRouter = require('./router/user')
const mime = require('./util/mime')

const SESSION_DATA = {}

const serverHandle = (req, res) => {
  const url = req.url
  res.setHeader('Content-type', mime(url))
  req.path = url.split('?')[0]
  // 解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) return
    const arr = item.split('=')
    const key = arr[0]
    const val = arr[1]
    req.cookie[key] = val
  })
  const blogData = handleBlogRouter(req, res)
  const userData = handleUserRouter(req, res)
  if (url.match('api')) {
    if (blogData) {
      blogData.then(data => {
        res.end(JSON.stringify(data))
      })
      return
    }
    if (userData) {
      userData.then(data => {
        res.end(JSON.stringify(data))
      })
      return
    }
  }
  res.end()
  // res.end('404 Not Found')
}

module.exports = serverHandle
