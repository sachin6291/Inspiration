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
          <div className="logo">
          <Link to="/" >Inspiration</Link>
          </div>
          <div className="nav">
          <Link to="/newProject"> NewProject </Link>
          <Link to="/allProject"> All Project </Link>
            <Link to="profile">Hello {this.props.userInSession.username}!</Link>
          {/* <p></p> */}
          <span onClick={this.logout}> Log Out </span>
          </div>
        </nav>
      )
    }
    else{
      return(
        <nav>
          <div className="logo">
          <Link to="/">Inspiration</Link>
          </div>
          <div className="nav">
            <span>Hello Guest!</span>
          <Link to="/allProject"> All Project </Link>
          <Link to="/login"> Log In </Link>
          <Link to="/signup"> Sign Up </Link>
          </div>
        </nav>
      )
    }
  }
}
export default navigation