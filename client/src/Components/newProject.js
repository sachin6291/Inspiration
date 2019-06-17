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
        role: [{role:'', number:0}],
        imageUrl: ''
      },
      id:'',
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
    return this.services.newProject(this.state.project)
      .then(x=> this.setState({id: x._id}))
      .then(x => this.setState({redirect: true}))
  }

  wInput = (e, index) => {
    console.log(e.target.name, e.target.value)
    
    const {value} = e.target;
  
    const _project = { ...this.state.project };
     _project.role[index].role =value;
    this.setState({ project: _project })
  }
  nInput=(e, index)=>{
    console.log(e.target.name, e.target.value)
    const{value} =e.target
    const _project = {...this.state.project}
    _project.role[index].number = value
    this.setState({project:_project})
  }

  generateInputs = () => {
    const inputs = [];
    console.log(this.state.project.role[0].role, this.state.project.role[0].number)
    for (let i = 0; i < this.state.inputs; i++) {
      inputs.push(<input onChange={(e) => this.wInput(e, i)} value={this.state.project.role[i].role} type="text" className="form-control" id="role" name="role" />)
      inputs.push(<input onChange={(e) => this.nInput(e, i)} value={this.state.project.role[i].number} type="number" id="role" name="number" />)
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
  imageUpload = e => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    this.services.imagenUpload(uploadData)
      .then(response => {
        this.setState({
          project: {
            ...this.state.project, imageUrl: response.secure_url
          }
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    if(this.state.redirect && this.state.id){
      console.log(this.state.id)
      return <Redirect to={`/projectDetail/${this.state.id}`} />
    }
    else{
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <img src={(this.state.project.imageUrl?this.state.project.imageUrl:"images/chicken.jpg")}alt=""></img>
          </div>
          <div className="form-group">
            <label htmlFor="name">Título</label>
            <input onChange={this.handlechange} value={this.state.project.name} type="text" className="form-control" id="name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea onChange={this.handlechange} value={this.state.project.description}  id="description" name="description" cols="40" rows="5"></textarea>
            {/* <input onChange={this.handlechange} value={this.state.project.description} type="text" className="form-control" id="description" name="description" spellcheck="true" /> */}
          </div>
          <div>
            <label htmlFor="img">Upload Image</label>
            <input onChange={this.imageUpload} type="file" id="img" name="img" />
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