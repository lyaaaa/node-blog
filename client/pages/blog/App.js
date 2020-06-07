import React, { Component } from 'react'
import './App.css'
import { getMyBlogList } from '@common/js/api'
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
    const list = await getMyBlogList()
    if (list instanceof Array) {
      this.setState({
        blogList: list
      })
    } else {
      this.setState({
        blogList: []
      })
    }
  }

  render() {
    const { blogList } = this.state

    return (
      <div className="App">
        <Header></Header>
        <BlogList list={blogList} isEdit={true}></BlogList>
      </div>
    )
  }
}

export default App
