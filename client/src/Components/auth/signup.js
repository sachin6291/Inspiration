import React, { Component } from 'react'
import AuthServices from '../../service/auth-services'

class Signup extends Component {

  constructor(props) {
    super(props)
    this.state = { username: '', password: '' }
    this.services = new AuthServices()
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit = e => {

    e.preventDefault()
    const { username, password } = this.state
    this.services.signup(username, password)
      .then(response => {
        this.setState({ username: '', password: '' })
        this.props.setTheUser(response)
      })
      .catch(error => console.log(error.response.data.message))
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input onChange={this.handleChange} value={this.state.username} type="text" className="form-control" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={this.handleChange} value={this.state.password} type="password" className="form-control" id="password" name="password" />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    )
  }

}


export default Signup