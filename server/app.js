const handleBlogRouter = require('./router/blog')
const handleUserRouter = require('./router/user')
const mime = require('./util/mime')
// 设置cookie有效时间
const getCookieExpiress = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toGMTString()
}
// session 数据
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
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })
  let userId = req.cookie.userid
  console.log('userId', userId, SESSION_DATA)
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    userId = `${Date.now()}_${Math.random()}`
    // 设置cookie
    res.setHeader(
      'Set-Cookie',
      `userid=${userId}; path=/; httpOnly; expires=${getCookieExpiress()}`
    )
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]
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
