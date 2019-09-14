const fs = require('fs')
const path = require('path')

const handlePageRouter = (req, res) => {
  const url = path.join('./', req.url)
  fs.readFile(path.normalize(url), (err, data) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/html' })
    } else {
      res.write(data.toString())
      res.end()
    }
  })
}

module.exports = handlePageRouter
