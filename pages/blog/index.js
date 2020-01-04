import './index.css'
import axios from 'axios'
import $ from 'jquery'

axios.get('/api/user/loginCheck').then(res => {
  if (res.data.code === 0) {
    $('#blog h1').text(`您好，${res.data.data.realname || res.data.data.username}`)
  }
})
axios.get('/api/blog/myblog').then(res => {
  const list = res.data.data
  for (let i = 0; i < list.length; i++) {
    let dom = `<div class="box">
                    <div class="top">
                      <div class="title">${list[i].title}</div>
                      <div class="author">作者：${list[i].author}</div>
                    </div>
                    <div class="content">
                      ${list[i].content}
                    </div>
                </div>`
    $('.blog-box').append(dom)
  }
})
