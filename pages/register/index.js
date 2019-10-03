import './index.css'
import axios from 'axios'

const registerBtn = document.getElementById('register')

registerBtn.addEventListener('click', () => {
  const account = document.getElementById('account').value
  const password = document.getElementById('password').value
  console.log(account, password)
})