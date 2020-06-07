import React, { Component } from 'react'
import './index.css'

export default class BlogList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  async getDetail(id) {
    window.location.href = `/dist/detail.html?id=${id}`
  }
  handleEditor(id, e) {
    e.stopPropagation()
    window.location.href = `/dist/editor.html?id=${id}`
  }
  handleDelete(id, e) {
    e.stopPropagation()
    console.log('handleDelete', id)
  }

  render() {
    const { list, isEdit } = this.props

    const listItems = list.map(item => (
      <div
        className="box"
        key={item.id}
        onClick={() => this.getDetail(item.id)}
      >
        <div className="top">
          <div>
            <div className="title">{item.title}</div>
            <div className="author">作者：{item.author}</div>
          </div>
          {isEdit && <div className="edit-box">
            <div className="editor" onClick={(e) => this.handleEditor(item.id, e)}>编辑</div>
            <div className="delete" onClick={(e) => this.handleDelete(item.id, e)}>删除</div>
          </div>}
        </div>
        <div className="content">{item.content}</div>
      </div>
    ))
    return <div className="main_width">{listItems}</div>
  }
}
