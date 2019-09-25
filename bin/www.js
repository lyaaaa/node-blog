const http = require('http')

const PORT = 8000
const serverHandle = require('../app')
const { exec } = require('child_process')

const server = http.createServer(serverHandle)
server.listen(PORT, () => {
  console.log(`listen at localhost:${PORT}`)
  const url = `http://localhost:${PORT}/pages/login.html`
  // switch (process.platform) {
  //   case 'darwin':
  //     exec(`open ${url}`)
  //   case 'win32':
  //     exec(`start ${url}`)
  //   default:
  //     exec(`open ${url}`)
  // }
})
