import React, { Component } from 'react'
import '@common/css/common.css'
import './App.css'
import { getQuery } from '@common/js/util'
import { getBlogDetail } from '@common/js/api'
import Header from '@common/components/Header'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blogDetail: null
    }
  }

  async componentDidMount() {
    const id = getQuery('id')
    const detail = await getBlogDetail(id)
    if (detail.id) {
      this.setState({
        blogDetail: detail
      })
    }
  }

  render() {
    const { blogDetail } = this.state
    return (
      <div className="App">
        <Header></Header>
        {blogDetail &&
         <div className="detail-box main_width">
           <h1 className="title">{blogDetail.title}</h1>
           <div className="author">作者：{blogDetail.author}</div>
           <div className="detail-content">{blogDetail.content}</div>
         </div>
        }
      </div>
    )
  }
}

export default App
