import axios from 'axios'
import { getStorage } from './util'

const api = {
  login: '/api/user/login',
  user: '/api/user/getUser',
  register: '/api/user/register',
  blogList: '/api/blog/list',
  myBlogList: '/api/blog/myblog'
}

// 请求拦截器
axios.interceptors.request.use(
  function(config) {
    const token = getStorage('blog-token')
    if (token) {
      config.headers.authorization = 'Bearer ' + token
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(function(response) {
  const data = response.data
  if (data.code === 401) {
    return {
      code: 401,
      message: '请登录'
    }
  }
  return data
})

export const getAxiosData = async (url, method = 'GET', data) => {
  const axiosData = {
    url,
    method
  }
  if (method === 'GET' || method === 'get') {
    axiosData.params = data
  }
  if (method === 'POST' || method === 'post') {
    axiosData.data = data
  }
  const res = await axios(axiosData)
  if (res.code === 0) {
    return res.data
  } else {
    return res
  }
}

export const getUserData = () => getAxiosData('/api/user/getUser', 'GET')

export const loginApi = data => getAxiosData('/api/user/login', 'POST', data)

export const registerApi = data => getAxiosData('/api/user/register', 'POST', data)

export const getMyBlogList = () => getAxiosData('/api/blog/myblog', 'GET')

export const getBlogList = () => getAxiosData('/api/blog/list', 'GET')

export const getBlogDetail = id => getAxiosData('/api/blog/detail', 'GET', { id })
