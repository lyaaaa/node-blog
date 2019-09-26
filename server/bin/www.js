const http = require('http')

const PORT = 3000
const serverHandle = require('../app')
const { exec } = require('child_process')

const server = http.createServer(serverHandle)
server.listen(PORT, () => {
  console.log(`listen at localhost:${PORT}`)
})
