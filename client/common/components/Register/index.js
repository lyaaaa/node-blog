import React, { Component } from 'react'
import { registerApi } from '@common/js/api'
import './index.css'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      password: ''
    }

    this.closeRegister = this.closeRegister.bind(this)
    this.accountHandle = this.accountHandle.bind(this)
    this.passwordHandle = this.passwordHandle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  closeRegister() {
    this.props.registerController(false)
  }
  accountHandle(event) {
    this.setState({ account: event.target.value })
  }
  passwordHandle(event) {
    this.setState({ password: event.target.value })
  }
  async handleSubmit() {
    const { account, password } = this.state
    const data = await registerApi({ account, password })
    if (data && data.insertId) {
      // 注册成功
      this.closeRegister()
    } else {
      console.log('注册失败', data)
    }
  }

  render() {
    const { account, password } = this.state

    return (
      <div className="mask_box" onClick={this.closeRegister}>
        <div className="main" onClick={e => e.stopPropagation()}>
          <div className="title">注册</div>
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
          <button className="btn-login" onClick={this.handleSubmit}>确认注册</button>
          <button className="btn-register" onClick={this.closeRegister}>取消</button>
        </div>
      </div>
    )
  }
}