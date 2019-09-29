const handleBlogRouter = require('./router/blog')
const handleUserRouter = require('./router/user')
const mime = require('./util/mime')

const serverHandle = (req, res) => {
  const url = req.url
  res.setHeader('Content-type', mime(url))
  req.path = url.split('?')[0]
  const blogData = handleBlogRouter(req, res)
  const userData = handleUserRouter(req, res)
  if (url.match('api')) {
    if (blogData) {
      res.end(JSON.stringify(blogData))
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
