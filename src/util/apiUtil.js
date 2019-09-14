// 返回POST数据
function getPostData(req) {
  return new Promise((resolve, reject) => {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resolve(
        JSON.parse(postData)
      ) 
    })
  })
}

module.exports = { getPostData }