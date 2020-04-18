import React, { Component } from 'react'
import '@common/css/common.css'
import './App.css'
import { getBlogList } from '@common/js/api'
import Header from '@common/components/Header'
import BlogList from '@common/components/BlogList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blogList: []
    }
  }

  async componentDidMount() {
    const list = await getBlogList()
    if (list instanceof Array) {
      this.setState({
        blogList: list
      })
    }
  }

  render() {
    const { blogList } = this.state

    return (
      <div className="App">
        <Header></Header>
        <BlogList list={blogList}></BlogList>
      </div>
    )
  }
}

export default App
