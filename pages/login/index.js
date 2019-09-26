import './index.css'
import axios from 'axios'

const loginBtn = document.getElementById('login')
loginBtn.addEventListener('click', () => {
  const account = document.getElementById('account').value
  const password = document.getElementById('password').value
  axios
    .post('/api/user/login', {
      account,
      password
    })
    .then(res => {
      console.log('res', res)
    })
    .catch(err => {
      console.log('err', err)
    })
})
