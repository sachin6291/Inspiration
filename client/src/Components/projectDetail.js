import React,{Component} from "react"
import ProjectServices from "../service/project-services"

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
    console.log(this.state.project.user, this.state.project.author)
    return(
      <div>
        <h1>Details</h1>
        <p>ID:  {this.state.project._id}</p>
        <p>Project name:  {this.state.project.name}</p>
        <p>User:  {this.state.project.user}</p>
        <p>User Role:  {this.state.project.role}</p>
        <p>Project Description:  {this.state.project.description}</p>
        <p>Project Author:  {this.state.project.author}</p>
        <hr></hr>
        <br></br>
      </div>
    )
  }
}
export default ProjectDetail