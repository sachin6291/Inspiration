import React, { Component } from 'react'
import ProjectServices from "../service/project-services"
import { Redirect } from "react-router-dom"
class ProjectAdd extends Component {

  constructor() {
    super()
    this.state = {
      project:{
        name: '',
        description: '',
        user: '',
        role: '' 
      },
      redirect: false
    }

    this.services = new ProjectServices()
  }
  handlechange = e => {
    const { name, value } = e.target
    this.setState({
    project: {
      ...this.state.project,
      [name]: value
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({redirect:true})
    console.log("handle submit")
    this.services.newProject(this.state.project)
      .then(x=> console.log(x))
  }


  render() {
    if(this.state.redirect){
      return <Redirect to="/" />
    }
    else{
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Título</label>
            <input onChange={this.handlechange} value={this.state.project.name} type="text" className="form-control" id="name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <input onChange={this.handlechange} value={this.state.project.description} type="text" className="form-control" id="description" name="description" />
          </div>
          <div className="form-group">
            <label htmlFor="user">User</label>
            <input onChange={this.handlechange} value={this.state.project.user} type="text" className="form-control" id="user" name="user" />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input onChange={this.handlechange} value={this.state.project.role} type="text" className="form-control" id="role" name="role" />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    )
    }
  }
}

export default ProjectAdd