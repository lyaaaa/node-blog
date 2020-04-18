import React, { Component } from 'react'
import { loginApi } from '@common/js/api'
import { setStorage } from '@common/js/util'
import './index.css'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      account: '',
      password: ''
    }

    this.closeLogin = this.closeLogin.bind(this)
    this.accountHandle = this.accountHandle.bind(this)
    this.passwordHandle = this.passwordHandle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  closeLogin() {
    this.props.loginController(false)
  }
  accountHandle(event) {
    this.setState({ account: event.target.value })
  }
  passwordHandle(event) {
    this.setState({ password: event.target.value })
  }
  async handleSubmit() {
    const { account, password } = this.state
    const user = await loginApi({account, password})
    if (user.token) {
      setStorage('blog-token', user.token)
      this.props.userController(user)
      this.closeLogin()
    }
  }

  render() {
    const { account, password } = this.state

    return (
      <div className="mask_box" onClick={this.closeLogin}>
        <div className="main" onClick={e => e.stopPropagation()}>
          <div className="title">登录</div>
          <input
            placeholder="请输入账号"
            value={account}
            onChange={this.accountHandle}
          ></input>
          <input
            placeholder="请输入密码"
            type="password"
            value={password}
            onChange={this.passwordHandle}
          ></input>
          <button className="btn-login" onClick={this.handleSubmit}>登录</button>
          <button className="btn-register" onClick={this.handleSubmit}>注册</button>
        </div>
      </div>
    )
  }
}
