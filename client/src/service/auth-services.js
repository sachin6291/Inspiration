import axios from 'axios'

export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: 'http://localhost:3000/api/',
      withCredentials:true
    })
  }

  signup = (email,username, password) => {
    return this.service.post('/signup', { email, username, password })
      .then(response => response.data)
  }

  login = (email, password) => {
    return this.service.post('/login', { email, password })
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
  profileEdit=(user)=>{
    return this.service.post('/profileEdit', user)
    .then(response=>response.data)
  }
  loggedin = () => {
    return this.service.get('/loggedin')
      .then(response => response.data)
  }
  imgUpload = theImg => {
    return this.service.post('/upload-user', theImg)
      .then(result =>result.data)
      .catch(err => console.log(err))
  }
}