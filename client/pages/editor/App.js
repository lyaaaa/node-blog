import React, { Component } from 'react'
import './App.less'
import { getQuery } from '@common/js/util'
import { getBlogDetail } from '@common/js/api'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      blogDetail: {},
      value: ''
    }
  }

  handleChange(value) {
    this.setState({
      value
    })
  }
  hanldSave() {
    console.log('save', this.state.value)
  }

  handleTitle(event) {
    const { blogDetail } = this.state
    blogDetail.title = event.target.value
    this.setState({
      blogDetail
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
          value={value}
          options={options}
          onChange={value => this.handleChange(value)}
        />
      </div>
    )
  }
}

export default App
