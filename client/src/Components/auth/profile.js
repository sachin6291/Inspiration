// option to edit
// add company name
// add users role
// list of ideas
// current projects
// past projects
import React, {Component}from 'react'
import AuthService from '../../service/auth-services'
import { Redirect } from "react-router-dom"
import "./profile.scss"
class Profile extends Component{
  constructor(){
    super()
    this.state={
      user:{},
      redirect:false
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
          return <p className="bigger">{e}</p>
        })
      }else{
        return <p  className="bigger">None</p>
      }
    }
  }
  pastProjects=()=>{
    if (this.state.user.pastProjects) {
      if (this.state.user.pastProjects.length) {
        this.state.user.pastProjects.map(e => {
          return <p className="bigger">{e}</p>
        })
      } else {
        return <p className="bigger">No Projects Done</p>
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
  imagenUpload = e => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    this.services.imgUpload(uploadData)
      .then(response => {
        this.setState({
          user: {
            ...this.state.user, imageUrl: response.secure_url
          }
        })
      })
      .catch(err => console.log(err))
  }
  roleChange = e =>{
    e.preventDefault()
    this.setState({
      redirect:true
    })
  }
  render(){
    console.log(this.state.user.imageUrl)
    this.pastProjects()
    if(this.state.redirect){
     return <Redirect to="/profileEdit"/>
    }else{
    return(
      <div className="profile-wraper">
      <div className="profile-bg">
          <h1>Hello <span className="bold">{this.state.user.username}</span></h1>
        <div className="profile-img">
          <img className="user-img" src={(this.state.user.imageUrl) ? this.state.user.imageUrl : "images/chicken.jpg"} alt={(this.state.user.imageUrl) ? "profile picture" : "user is a chicken"}></img>
          <label htmlFor="img"><img src="/images/upload.svg" alt="upload image"></img></label>
          <input onChange={this.imagenUpload} type="file" id="img" name="img" />
        </div>
        {/* <div>
          <p>
          Friends:
          </p>
          <ul>
          {this.friends()}
          </ul>
          </div>
        <button>Add</button><button>Remove</button> */}
        <div className="profile-text">
          <div><p className="underline">Ideas:</p> {this.ideas()}</div>
          <span><img src="/images/add.svg"></img></span><span><img src="/images/remove.svg"></img></span>
            <p className="underline">Level:</p> <p className="bigger"> {this.state.user.level}</p>

            <div><p className="underline">Past Projects:</p> {this.pastProjects()}</div>
            <p className="underline">Current Projects:</p><p className="bigger"> {this.state.user.currnetProject}</p>
            <p className="underline">Role: </p><p>{(this.state.user.role) ? this.state.user.role : `You have not established a role yet`}</p>
          <button onClick={this.roleChange}>Change Role</button>
            <p className=" underline">Updated At: {this.state.user.updatedAt}</p>
            <p className="underline">Created: {this.state.user.createdAt}</p>
          <button>Change Password</button>
        </div>
      </div>
      </div>
    )}
  }
}

export default Profile