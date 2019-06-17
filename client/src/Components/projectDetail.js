import React,{Component} from "react"
import ProjectServices from "../service/project-services"
import{Link} from "react-router-dom"
// imagen
// quitar id
// modify roles
//añadir comentarios

class ProjectDetail extends Component{
  constructor(){
    super()
    this.state={ project:{},msg:""}
    this.services = new ProjectServices()
    this.updated = true
  }
  componentDidMount(){
    this.services.oneProject(this.props.match.params.id)
      .then(theProject=> this.setState({project: theProject}))
  }

  componentDidUpdate(){
    if (this.state.project && this.state.updated){
      this.services.oneProject(this.props.match.params.id)
        .then(theProject => this.setState({ project: theProject, updated: false }))
    }
  }
  handleMessage = () =>{
    this.services.joinProject(this.state.project, this.state.project._id)
    .then(response=> this.setState({msg:response.msg}))
    .catch(err=>this.setState({msg:err.response.data.msg}))
  }
  deleteProject=()=>{
    this.services.deleteProject(this.state.project, this.state.project._id)
    .then(response=>response)
    .catch(err=>console.log(err))
  }

  render(){
    console.log(this.state.project.roles)
   
   
  

    return(
      <React.Fragment>
      {this.state.project.user && this.state.project.author && 
      <div>
        <h1>Details</h1>
        <p>ID:  {this.state.project._id}</p>
        <p>Project name:  {this.state.project.name}</p>
        <p>User:  {this.state.project.user.map(e => e.username)}</p>
        {/* <p>User Role:  {this.state.project.role.role.map(e =>{
          console.log(e)
          return e
          })} and {this.state.project.role.number.map(e=>{
            console.log(e)
            return e
          })}</p> */}
        <p>Project Description:  {this.state.project.description}</p>
        <p>Project Author:  {this.state.project.author.username}</p>
          <Link to={`/projectEdit/${this.state.project._id}`}>Edit</Link>
        <br></br>
          {(this.state.msg) ? (<p>{this.state.msg}</p>) : null}
          <button onClick={this.handleMessage}>Join</button>
        <br></br>
          <button onClick={this.deleteProject}>Delete</button>
        <hr></hr>
        <br></br>
      </div>
      }
      </React.Fragment>
    )
    
  }
}
export default ProjectDetail