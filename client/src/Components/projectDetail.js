import React,{Component} from "react"
import ProjectServices from "../service/project-services"
import{Link} from "react-router-dom"

class ProjectDetail extends Component{
  constructor(){
    super()
    this.state={ project:{}}
    this.services = new ProjectServices()
  }
  componentDidMount(){

    this.services.oneProject(this.props.match.params.id)
      .then(theProject=> this.setState({project: theProject}))
  }
  render(){

    return(
      <React.Fragment>
      {this.state.project.user && this.state.project.author && 
      <div>
        <h1>Details</h1>
        <p>ID:  {this.state.project._id}</p>
        <p>Project name:  {this.state.project.name}</p>
        <p>User:  {this.state.project.user.map(e => e.username)}</p>
        <p>User Role:  {this.state.project.role}</p>
        <p>Project Description:  {this.state.project.description}</p>
        <p>Project Author:  {this.state.project.author.username}</p>
        <Link to="#">edit</Link>
        <br></br>
        <Link to="#">delete</Link>
        <hr></hr>
        <br></br>
      </div>
      }
      </React.Fragment>
    )
    
  }
}
export default ProjectDetail