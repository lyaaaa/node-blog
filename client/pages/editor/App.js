import React, { Component } from 'react'
import './App.less'
import { getQuery } from '@common/js/util'
import { getBlogDetail, addBlog } from '@common/js/api'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      blogDetail: {},
      value: '',
      EasyMDE: {}
    }
  }

  handleChange(value) {
    this.setState({
      value
    })
  }
  async hanldSave() {
    const { blogDetail, value, EasyMDE } = this.state

    if (blogDetail.id) {
      console.log('修改博客信息')
    } else {
      const res = await addBlog({
        title: blogDetail.title,
        content: value,
        contentHtml: EasyMDE.markdown(value)
      })
      if (res) {
        alert('新建博客成功')
        window.history.go(-1)
      }
    }
  }

  handleTitle(event) {
    const { blogDetail } = this.state
    blogDetail.title = event.target.value
    this.setState({
      blogDetail
    })
  }

  getInsance(instance) {
    this.setState({
      EasyMDE: instance
    })
  }

  async componentDidMount() {
    const id = getQuery('id')
    if (id) {
      const detail = await getBlogDetail(id)
      if (detail.id) {
        this.setState({
          blogDetail: detail,
          value: `${detail.content}`
        })
      }
    }
  }

  render() {
    const { value, blogDetail } = this.state
    const options = {
      hideIcons: ['fullscreen']
    }

    return (
      <div className="editor-main">
        <div className="editor-top">
          <div className="top-left">
            <input
              className="inp-title"
              placeholder="请输入文章标题"
              value={blogDetail.title}
              onChange={e => this.handleTitle(e)}
            />
          </div>
          <div className="top-right">
            <div className="save-btn" onClick={() => this.hanldSave()}>
              保存
            </div>
          </div>
        </div>
        <SimpleMDE
          id="editor-box"
          getMdeInstance= {instance => this.getInsance(instance) }
          value={value}
          options={options}
          onChange={value => this.handleChange(value)}
        />
      </div>
    )
  }
}

export default App
