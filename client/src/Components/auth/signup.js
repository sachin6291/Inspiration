import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
import AuthServices from '../../service/auth-services'
import "./auth.scss"
// email insted of username


class Signup extends Component {

  constructor(props) {
    super(props)
    this.state = {email:'', username: '', password: '' }
    this.services = new AuthServices()
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit = e => {

    e.preventDefault()
    const { email,username, password } = this.state
    this.services.signup(email, username, password)
      .then(response => {
        this.setState({email:'', username: '', password: '', redirect:true })
        this.props.setTheUser(response)
      })
      .catch(error => console.log(error.response.data.message))
  }

  render() {
    if(this.state.redirect){
      return <Redirect to="/"/>
    }
    return (
      <div className="auth-bg">
      <div className="auth">
        <h1>Sign Up</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input onChange={this.handleChange} value={this.state.email} type="email" className="form-control" id="email" name="email" />
          </div>
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
      </div>
    )
  }

}


export default Signup