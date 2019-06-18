import axios from 'axios'

export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: 'http://localhost:3000/api/',
      withCredentials:true
    })
  }

  signup = (username, password) => {
    return this.service.post('/signup', { username, password })
      .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/login', { username, password })
      .then(response => response.data)
  }

  logout = () => {
    return this.service.post('/logout', {})
      .then(response => response.data)
  }
  profile= ()=>{
    return this.service.get('/profile')
    .then(response=>response.data)
  }
  profileEdit=()=>{
    return this.service.post('/')
    .then(response=>response.data)
  }
  loggedin = () => {
    return this.service.get('/loggedin')
      .then(response => response.data)
  }
  imgUpload = theImg => {
    return this.service.post('/upload', theImg)
      .then(result =>result.data)
      .catch(err => console.log(err))
  }
}