import React, {Component}from "react"
import ProjectServices from "../service/project-services"
import { Redirect } from "react-router-dom"
import "./editProject.scss"
//cambiar imagen hecho en el model;
class ProjectEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      project: {},
      redirect: false,
      inputs: 0
    }

    this.services = new ProjectServices()
  }
  componentDidMount(){
    this.services.oneProject(this.props.match.params.id)
      .then(theProject=> this.setState({project: theProject, inputs:theProject.roles.length}))
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
  addInput= e =>{
    e.preventDefault()
    let inputCopy = this.state.inputs
    inputCopy++
    const _project = {...this.state.project};
    _project.roles.push({role:"", number:0})
    this.setState({inputs: inputCopy, project:_project})
    this.generateInputs()
  }

  handleSubmit = e => {
    e.preventDefault()
    
  
    this.services.editProject(this.state.project, this.props.match.params.id)
      .then(() => this.setState({ redirect: true }))
  }

  // wInput = (e, index) => {
  //   const {value} = e.target;
  //   const _project = {...this.state.project};
  //   _project.role[index] = value;
  //   this.setState({project:_project})
  // }
  wInput = (e, index) => {
    const { name, value } = e.target;
    const _project = { ...this.state.project };
    if (name === "role") {
      _project.roles[index].role = value;
    } else if (name === "number") {
      _project.roles[index].number = value
    }
    this.setState({ project: _project })
  }
  // generateInputs = () => {
  //   const inputs = [];
  //   for(let i = 0; i < this.state.inputs; i++){  
  //     inputs.push(<input onChange={(e) => this.wInput(e, i)} value={this.state.project.roles[i]} type="text" className="form-control" id="role" name="role" />)
  //   }
  //   return inputs
  // }
  generateInputs = () => {
    const inputs = [];
    for (let i = 0; i < this.state.inputs; i++) {
      inputs.push(
        <div className="generateInput">
          <input key={i + 1} onChange={(e) => this.wInput(e, i)} value={this.state.project.roles[i].role} type="text" className="roleTitle" id={`role${i}`} name="role" />
          <input key={-(i + 1)} onChange={(e) => this.wInput(e, i)} value={this.state.project.roles[i].number} type="number" className="roleNumber" id={`roleNum${i}`} name="number" />
        </div>)
    }
    return inputs
  }
  removeInput = e => {
    e.preventDefault()
    let inputCopy = this.state.inputs
    const roleCopy = { ...this.state.project }
    if (inputCopy >= 1) {
      inputCopy--
      roleCopy.roles.pop()
    }
    this.setState({ inputs: inputCopy, project: roleCopy })
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
    if (this.state.redirect) {
      return <Redirect to ={`/projectDetail/${this.state.project._id}`} />
    }
    else {
      return (
        <React.Fragment>
          {this.state.project.user && this.state.project.author && 
          <div className="edit-wraper">
            <div className="edit-bg">
              <h1>Edit</h1>
              <form onSubmit={this.handleSubmit} >
                <div className="profile-img">
                  <img className="user-img" src={(this.state.project.imageUrl) ? this.state.project.imageUrl : "images/chicken.jpg"} alt={(this.state.project.imageUrl) ? "profile picture" : "user is a chicken"}></img>
                  <label htmlFor="img"><img src="/images/upload.svg" alt="upload image"></img></label>
                  <input onChange={this.imagenUpload} type="file" id="img" name="img" />
                </div>
                <div className="edit-form">
                  <div className="form-ailgn">
                  <div className="form-text">
                    <label htmlFor="name">Title</label>
                    <input onChange={this.handlechange} value={this.state.project.name} type="text" className="form-title" id="name" name="name" />
                  </div>
                  <div className="form-text">
                    <label htmlFor="description">Descripción</label>
                    <textarea onChange={this.handlechange} value={this.state.project.description} type="text" className="form-control" id="description" name="description" />
                  </div>
                  {/* <div className="form-group">
                    <label htmlFor="user">User</label>
                    <input onChange={this.handlechange} value={this.state.project.user[0].username} type="text" className="form-control" id="user" name="user" />
                  </div> */}
                  <div className="role-group">
                    <label htmlFor="role">Role</label>
                    {this.generateInputs().map(input => input)}
                      <span onClick={this.addInput}><img src="/images/add.svg" alt="add" className="icon"></img></span>
                      <span onClick={this.removeInput}><img src="/images/remove.svg" alt="remove" className="icon"></img></span>
                  </div>
                  <button type="submit">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          }
        </React.Fragment>
      )
    }
  }
}

export default ProjectEdit