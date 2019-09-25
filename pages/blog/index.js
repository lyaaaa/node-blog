import './index.css'
import axios from 'axios'
axios
  .get('/api/blog/list')
  .then(function(response) {
    console.log(response)
  })
  .catch(function(error) {
    console.log(error)
  })
