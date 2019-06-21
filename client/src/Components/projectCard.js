import React from "react"
import { Link } from "react-router-dom"


const ProjectCard =  theProject =>{
  console.log(theProject)
  return (
    <div>
      <div className="card">
        <img src={theProject.imageUrl} alt="project image"></img>
        <div className="cardText">
          <Link to={`/projectDetail/${theProject._id}`}><p>{theProject.name}</p></Link>
          <p>Project Description:  {theProject.description}</p>
          <p>Project Author:  {theProject.author}</p>
        </div>
      </div>

    </div>
  )
}
export default ProjectCard