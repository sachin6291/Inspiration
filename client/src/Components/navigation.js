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
          {this.props.userInSession.username}
          <Link to="/">Home</Link>
          <Link to="/newProject">newProject</Link>
          <Link to="/allProject">All Project</Link>
          <div onClick={this.logout}>Log Out</div>
        </nav>
      )
    }
    else{
      return(
        <nav>
          Invitado
          <Link to="/">Home</Link>
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/allProject">all Project</Link>
        </nav>
      )
    }
  }
}
export default navigation