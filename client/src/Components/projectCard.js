import React from "react"
import { Link } from "react-router-dom"


const ProjectCard =  theProject =>{
  console.log(theProject.author)
  return (
    <div>
      <div className="card">
        <img src={theProject.imageUrl} alt="project image"></img>
        <div className="cardText">
          <Link to={`/projectDetail/${theProject._id}`}><p>{theProject.name}</p></Link>
          <p>Description:  {theProject.description}</p>
          <p>Author:  {theProject.author.username}</p>
        </div>
      </div>

    </div>
  )
}
export default ProjectCard