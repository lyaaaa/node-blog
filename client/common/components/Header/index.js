import React, { Component } from 'react'
import { getUserData } from '@common/js/api'
import { setStorage } from '@common/js/util'
import Login from '@common/components/Login'
import Register from '@common/components/Register'
import './index.css'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      loginDialog: false,
      registerDialog: false
    }

    this.loginController = isShow => {
      this.setState({
        loginDialog: isShow
      })
    }
    this.registerController = isShow => {
      this.setState({
        registerDialog: isShow
      })
    }
    this.userController = user => {
      this.setState({
        user
      })
    }
    this.outLogin = () => {
      setStorage('blog-token', '')
      this.setState({
        user: null
      })
    }
    this.linkHome = () => {
      if (window.location.pathname !== '/dist/blog.html') {
        window.location.href = '/dist/blog.html'
      }
    }
  }

  render() {
    const { user, loginDialog, registerDialog } = this.state
    return (
      <div id="Header">
        <div className="main_width header_box">
          <h1>node-blog</h1>
          {!!user ? (
            <div className="user_box">
              <span onClick={this.linkHome}>您好，{user.realname || user.username}</span>
              <div className="out_btn" onClick={this.outLogin}>退出</div>
            </div>
          ) : (
            <div className="use_btn">
              <div className="login_btn" onClick={this.loginController}>
                登录
              </div>
              <div className="register_btn" onClick={this.registerController}>注册</div>
            </div>
          )}
        </div>
        {loginDialog && <Login loginController={this.loginController} userController={this.userController}></Login>}
        {registerDialog && <Register registerController={this.registerController}></Register>}
      </div>
    )
  }
  async componentDidMount() {
    const user = await getUserData()
    if (user.id) {
      this.setState({
        user
      })
    }
  }
}
