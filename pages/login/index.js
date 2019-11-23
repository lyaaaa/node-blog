import './index.css'
import axios from 'axios'
import $ from 'jquery'

console.log($('#login'))
axios.get('/api/user/loginCheck').then(res => {
  if (res.data.code === 0) {
    window.location.href = '/html/home.html'
  }
})
const loginBtn = document.getElementById('login')
const registerBtn = document.getElementById('register')
loginBtn.addEventListener('click', () => {
  const account = document.getElementById('account').value
  const password = document.getElementById('password').value
  axios
    .post('/api/user/login', {
      account,
      password
    })
    .then(res => {
      if (res.data.code === 0) {
        window.location.href = '/html/home.html'
      }
    })
    .catch(err => {
      console.log('err', err)
    })
})

registerBtn.addEventListener('click', () => {
  window.location.href = '/html/register.html'
})
