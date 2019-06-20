import React, { Component } from 'react'
import AuthServices from '../../service/auth-services'
import "./auth.scss"

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = { email: '', password: '' }
    this.services = new AuthServices()
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit = e => {

    e.preventDefault()
    const { email, password } = this.state
    this.services.login(email, password)
      .then(response => {
        this.setState({ email: '', password: '' })
        this.props.setTheUser(response)
      })
      .catch(error => console.log(error.response.data.message))
  }

  render() {
    return (
      <div className="auth-bg">
      <div className="auth">
        <h1>Log in</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input onChange={this.handleChange} value={this.state.email} type="email" className="form-control" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={this.handleChange} value={this.state.password} type="password" className="form-control" id="password" name="password" />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
      </div>
    )
  }

}

export default Login