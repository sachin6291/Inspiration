import React, { Component } from 'react'
import ProjectServices from "../service/project-services"
import { Redirect } from "react-router-dom"
// añadir imagenes,
// rango de share: all, company if in company, friends, personal
class ProjectAdd extends Component {

  constructor() {
    super()
    this.state = {
      project:{
        name: '',
        description: '',
        role: [] 
      },
      redirect: false,
      inputs: 1
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
    this.services.newProject(this.state.project)
      .then(x=> console.log(x))
  }
  wInput = (e, index) => {
    const { value } = e.target;
    const _project = { ...this.state.project };
    console.log(_project.role, value, this.state.project)
    _project.role[index] = value;
    this.setState({ project: _project })
  }

  generateInputs = () => {
    const inputs = [];
    for (let i = 0; i < this.state.inputs; i++) {
      inputs.push(<input onChange={(e) => this.wInput(e, i)} value={this.state.project.role[i]} type="text" className="form-control" id="role" name="role" />)
    }
    return inputs
  }
  addInput = e => {
    e.preventDefault()
    let inputCopy = this.state.inputs
    inputCopy++
    this.setState({ inputs: inputCopy })
    this.generateInputs()
  }
  removeInput = e => {
    e.preventDefault()
    let inputCopy = this.state.inputs
    const roleCopy = {...this.state.project}
    if(inputCopy >= 1) {
      inputCopy--
      roleCopy.role.pop()
    }
    this.setState({ inputs: inputCopy ,project: roleCopy  })
    this.generateInputs()
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
            <label htmlFor="role">Role</label>
            {this.generateInputs().map(input => input)}
            <button onClick={this.addInput}>Add</button>
            <button onClick={this.removeInput}>Remove</button>            
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    )
    }
  }
}

export default ProjectAdd