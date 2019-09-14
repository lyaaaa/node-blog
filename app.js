const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const handlePageRouter = require('./src/router/pageRoute')
const mime = require('./src/util/mime')

const serverHandle = (req, res) => {
  const url = req.url
  res.setHeader('Content-type', mime(url))
  req.path = url.split('?')[0]
  const blogData = handleBlogRouter(req, res)
  const userData = handleUserRouter(req, res)
  if (url.match('pages')) {
    handlePageRouter(req, res)
    return
  } else if (url.match('api')) {
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
  res.end('404 Not Found')
}

module.exports = serverHandle
