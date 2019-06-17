// option to edit
// add company name
// add users role
// list of ideas
// current projects
// past projects
import React, {Component}from 'react'
import AuthService from '../../service/auth-services'
class Profile extends Component{
  constructor(){
    super()
    this.state={
      user:[]
    }
    this.services= new AuthService()
  }
  componentDidMount(){
    this.services.profile()
      .then(userData=> this.setState({user:userData}))
  }
  render(){
  console.log(this.state.user)
    return(
      <div>
        <h2>Hola {this.state.user.username}</h2>
        <p>ID: {this.state.user._id}</p>
        <p>Access: {this.state.user.access}</p>
        <p>Created: {this.state.user.createdAt}</p>
        <p>Friends: {this.state.user.friends}</p>
        <p>Ideas: {this.state.user.ideas}</p>
        <p>Level: {this.state.user.level}</p>
        <p>Password: {this.state.user.password}</p>
        <p>Past Projects: {this.state.user.pastProjects}</p>
        <p>Current Projects: {this.state.user.project}</p>
        <p>Role: {this.state.user.role}</p>
        <p>Updated At: {this.state.user.updatedAt}</p>
      </div>
    )
  }
}

export default Profile