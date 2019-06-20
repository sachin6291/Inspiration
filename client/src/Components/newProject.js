import React, { Component } from 'react'
import ProjectServices from "../service/project-services"
import { Redirect } from "react-router-dom"
import "./newProject.scss"
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
    const {name, value} = e.target;  
    const _project = { ...this.state.project };
    if(name === "role"){
      _project.role[index].role =value;
    }else if(name === "number"){
      _project.role[index].number = value
    }
    this.setState({ project: _project })
  }
  // nInput=(e, index)=>{
  //   const{value} =e.target
  //   const _project = {...this.state.project}
  //   _project.role[index].number = value
  //   this.setState({project:_project})
  // }

  generateInputs = () => {
    const inputs = [];
    for (let i = 0; i < this.state.inputs; i++) {
      inputs.push(
        <div className="generateInput">
          <input key={i+1} onChange={(e) => this.wInput(e, i)} value={ this.state.project.role[i].role} type="text" className="roleTitle" id={`role${i}`} name="role" />
          <input key={-(i+1)} onChange={(e) => this.wInput(e, i)} value={ this.state.project.role[i].number} type="number" className="roleNumber" id={`roleNum${i}`} name="number" />
        </div>)
    }
    return inputs
  }
  addInput = e => {
    e.preventDefault()
    let inputCopy = this.state.inputs
    inputCopy++

    const _project = {...this.state.project}
    _project.role.push({ role: "", number: 0 })
    this.setState({ inputs: inputCopy, project:_project}, () => console.log(this.state))
    // this.generateInputs()
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
    // this.generateInputs()
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
      <div className="add-bg">
        <div className="add-form">
          <div className="image">
            <div>
              <img src={(this.state.project.imageUrl?this.state.project.imageUrl:"images/chicken.jpg")}alt="uploded image" className="project-pic"></img>
            </div>
            <div className="upload">
              <label htmlFor="img"><img src="/images/upload.svg" alt="upload image"></img></label>
              <input onChange={this.imageUpload} type="file" id="img" name="img"/>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Título</label>
                <input onChange={this.handlechange} value={this.state.project.name} type="text" className="title" id="name" name="name" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea onChange={this.handlechange} value={this.state.project.description}  id="description" name="description" cols="40" rows="5"></textarea>
                {/* <input onChange={this.handlechange} value={this.state.project.description} type="text" className="form-control" id="description" name="description" spellcheck="true" /> */}
              </div>
              <div className="role">
                <div>
                  <label htmlFor="role">Role</label>
                  {this.generateInputs().map(input => input)}
                </div>
                <span onClick={this.addInput}><img src="/images/add.svg" alt="add" className="icon"></img></span>
                <span onClick={this.removeInput}><img src="/images/remove.svg" alt="remove" className="icon"></img></span>            
              </div>
              <button type="submit">Save</button>
          </form>
        </div>
      </div>
    )
    }
  }
}

export default ProjectAdd