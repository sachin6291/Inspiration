import React from "react"
import { Link } from "react-router-dom"

const ProjectCard =  theProject =>{
  return (
    <div>
      <Link to={`/projectDetail/${theProject._id}`}><p>Project name:  {theProject.name}</p></Link>
      <p>Project Description:  {theProject.description}</p>
      <p>Project Author:  {theProject.author}</p>
      <hr></hr>
      <br></br>
    </div>
  )
}
export default ProjectCard