const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('../build/webpack.dev.js')
const compiler = webpack(WebpackConfig)
const bodyParser = require('body-parser')
const app = express()
const jwt = require('express-jwt')
const { secretKey } = require('./conf/constant')
const path = require('path')
const { verifyToken } = require('./util/token')

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/dist/'
  })
)
app.use(webpackHotMiddleware(compiler))

app.use(express.static(path.join(__dirname, '../public')))

// 解析 application/json
app.use(bodyParser.json())
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

app.use(
  jwt({
    secret: secretKey
  }).unless({
    path: ['/api/user/login', '/api/user/register', '/api/blog/list', '/api/blog/detail', /\.ico$/, /\.html$/]
  })
)

// 校验token
app.use(verifyToken)

// 接口
const userRouter = require('./router/user')
const blogRouter = require('./router/blog')

app.use(userRouter)
app.use(blogRouter)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
