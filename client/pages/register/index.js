import './index.css'
import $ from 'jquery'
import { getAxiosData } from '../../common/js/api'

$('#register').on('click', async () => {
  const account = $('#account').val()
  const password = $('#password').val()
  // 注册
  try {
    const data = await getAxiosData('register', 'post', {
      account,
      password
    })
    console.log('register', data)
  } catch (err) {
    console.log('err', err)
  }
})
$('#cancle').on('click', () => {
  window.history.back(-1)
})
