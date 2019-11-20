import './index.css'
import axios from 'axios'
// import $ from 'jquery'

axios.get('/api/user/loginCheck').then(res => {
  if (res.data.code === 0) {
    console.log(res.data)
    $('#home h1').text(`您好，${res.data.data.realname || res.data.data.username}`)
  }
})