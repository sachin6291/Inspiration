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
      user:{}
    }
    this.services= new AuthService()
  }
  componentDidMount(){
    this.services.profile()
      .then(userData=> this.setState({user:userData}))
  }
  ideas=()=>{
    if(this.state.user.ideas){
      if(this.state.user.ideas.length){
        this.state.user.ideas.map(e=>{
          return <p>{e}</p>
        })
      }else{
        return <p>None</p>
      }
    }
  }
  pastProjects=()=>{
    if (this.state.user.pastProjects) {
      if (this.state.user.pastProjects.length) {
        this.state.user.pastProjects.map(e => {
          return <p>{e}</p>
        })
      } else {
        return <p>No Projects Done</p>
      }
    }
  }
  friends = () => {
    if (this.state.user.friends) {
      if (this.state.user.friends.length) {
        this.state.user.friends.map(e => {
          return <li>{e}</li>
        })
      } else {
        return <p>You dont have friends</p>
      }
    }
  }
  render(){
    this.pastProjects()
    return(
      <div>
        <h2>Hola {this.state.user.username}</h2>
        <img src={(this.state.user.imageUrl) ? this.state.user.imageUrl : "images/chicken.jpg"} alt={(this.state.user.imageUrl) ? "profile picture" : "user is a chicken"}></img>
        <button>Change Image</button>
        <p>ID: {this.state.user._id}</p>
        <p>Access: {this.state.user.access}</p>
        <p>Created: {this.state.user.createdAt}</p>
        <div>
          <p>
            Friends:
          </p>
          <ul>
            {this.friends()}
          </ul>
        </div>
        <button>Add</button><button>Remove</button>
        <div><p>Ideas:</p> {this.ideas()}</div>
        <button>Add</button><button>Remove</button>
        <p>Level: {this.state.user.level}</p>
        <p>Password: {this.state.user.password}</p>
        <button>Change Password</button>
        <div><p>Past Projects:</p> {this.pastProjects()}</div>
        <p>Current Projects: {this.state.user.currnetProject}</p>
        <p>Role: {this.state.user.role}</p>
        <button>Change Role</button>
        <p>Updated At: {this.state.user.updatedAt}</p>
      </div>
    )
  }
}

export default Profile