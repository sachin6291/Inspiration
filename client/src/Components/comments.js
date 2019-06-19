import React,{Component} from "react"
import ProjectServices from "../service/project-services"

class Comments extends Component{
  constructor(props){
    super(props)
    this.service= new ProjectServices()
  }
  render(){
    const {comment, commenter} = {...this.props}
    return(
      <div>
        <h5>{commenter}</h5>
        <p>{comment}</p>
      </div>
      
    )
  }
}
export default Comments