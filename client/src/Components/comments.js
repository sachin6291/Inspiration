import React from "react"
import ProjectServices from "../service/project-services"
const Comments =props=>{
  return(
    <div>
    <p>{props.text}</p>
    <p>{props.user[0].username}</p>
    </div>
  )
}
export default Comments