import './index.css'
import axios from 'axios'
import $ from 'jquery'

$('.blog-list').click(() => {
  window.location.href = '/html/blog.html'
})
axios.get('/api/user/loginCheck').then(res => {
  if (res.data.code === 0) {
    $('#home h1').text(`您好，${res.data.data.realname || res.data.data.username}`)
  }
})
// 获取博客列表
axios.get('/api/blog/list').then(res => {
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