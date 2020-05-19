import axios from 'axios'

export default (url = `http://localhost:8081`) => {
  return axios.create({
    baseURL: url
  })
}
