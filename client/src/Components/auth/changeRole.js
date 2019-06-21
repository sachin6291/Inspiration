// edit password
// edit username
// edit role
// edit company
import React, {Component} from "react"
import { Redirect } from "react-router-dom"
import AuthServices from "../../service/auth-services"

class ChangeRole extends Component {
constructor(){
  super()
  this.state={
    user:{},
    redirect:false
  }
  this.services = new AuthServices()
}
  componentDidMount() {
    this.services.profile()
      .then(userData => this.setState({ user: userData }))
  }
  onChage = (e) => {
    const {value, name} = e.target;
    console.log(value)
    this.setState({user:{...this.state.user, [name]:value}})
  }
  handleSubmit = e => {
      e.preventDefault()
  console.log(this.state.user)      
      this.services.profileEdit(this.state.user)
        .then(() => this.setState({ redirect: true }))
    }
  
  render(){
    if(this.state.redirect){
      return <Redirect to="profile" />
    }else{
    return(
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="role">Role change</label>
        <input onChange={this.onChage}type="text" name="role" value={this.state.user.role}></input>
        <button type="submit">Save</button>
      </form>
    )}

  }
}

export default ChangeRole