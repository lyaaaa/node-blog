import './index.css'
import { getAxiosData } from '../../common/js/api'
import $ from 'jquery'

getAxiosData('user').then(res => {
  $('#blog h1').text(`您好，${res.realname || res.username}`)
})
getAxiosData('myBlogList').then(list => {
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
