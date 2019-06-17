import React, { Component } from 'react'
import ProjectServices from "../service/project-services"
import ProjectCard from "./projectCard"
// imagenes para cada proyecto hecho en el model,
// rango de fecha del que ha sido añadido hecho en el model
// votos hecho en el model
class ProjectList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      project: []
    }

    this.services = new ProjectServices()
  }
  componentDidMount() {
    this.services.allProjects()
      .then(allProjects => this.setState({ project: allProjects }))
  }


  render() {

      return (
        <div>
          <h1>all the projects</h1>
          <div>{this.state.project.map((theProject, idx)=><ProjectCard key={idx} {...theProject} />)}</div>
        </div>
      )
    }
  }


export default ProjectList