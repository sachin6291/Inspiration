import React, {Component} from "react"
import {Link} from "react-router-dom"
import AuthServices from "../service/auth-services"

class navigation extends Component{
  constructor(props){
    super(props)
    this.service = new AuthServices()
  }
  logout=()=>{
    this.service.logout()
      .then(x=> this.props.setTheUser(null))
  }
  render(){
    if(this.props.userInSession){
      return(
        <nav>
          <p>{this.props.userInSession.username}</p>
          <Link to="/">Home</Link>
          <Link to="/newProject"> NewProject </Link>
          <Link to="/allProject"> All Project </Link>
          <Link to="profile">Profile</Link>
          <span onClick={this.logout}> Log Out </span>
        </nav>
      )
    }
    else{
      return(
        <nav>
          Invitado
          <Link to="/"> Home </Link>
          <Link to="/login"> Log In </Link>
          <Link to="/signup"> Sign Up </Link>
          <Link to="/allProject"> All Project </Link>
        </nav>
      )
    }
  }
}
export default navigation