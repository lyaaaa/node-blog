import './index.css'
import axios from 'axios'

$('#register').on('click', () => {
  const account = $('#account').val()
  const password = $('#password').val()
  // 注册
  axios.post('/api/user/register', {
    account,
    password
  }).then(data => {
    console.log('data', data)
  })
})
$('#cancle').on('click', () => {
  window.history.back(-1)
})