import React, { Component } from 'react'
import './index.css'

export default class BlogList extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.getDetail = this.getDetail.bind(this)
  }
  async getDetail(id) {
    window.location.href = `/dist/detail.html?id=${id}`
  }

  render() {
    const { list } = this.props

    const listItems = list.map(item => (
      <div className="box" key={item.id} onClick={() => this.getDetail(item.id)}>
        <div className="top">
          <div className="title">{item.title}</div>
          <div className="author">作者：{item.author}</div>
        </div>
        <div className="content">{item.content}</div>
      </div>
    ))
    return <div className="main_width">{listItems}</div>
  }
}
