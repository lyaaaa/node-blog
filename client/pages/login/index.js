import './index.css'
import { getAxiosData } from '../../common/js/api'
import { setStorage } from '../../common/js/util'

getAxiosData('user', 'get').then(res => {
  console.log('getUser', res)
})

const loginBtn = document.getElementById('login')
const registerBtn = document.getElementById('register')
loginBtn.addEventListener('click',async () => {
  try {
    const account = document.getElementById('account').value
    const password = document.getElementById('password').value
    const user = await getAxiosData('login', 'post', { account, password })
    // 存储token
    setStorage('blog-token', user.token)
    window.location.href = '/dist/home.html'
  } catch(err) {
    console.log('error', err)
  }
})

registerBtn.addEventListener('click', () => {
  window.location.href = '/dist/register.html'
})
