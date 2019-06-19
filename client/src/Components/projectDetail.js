import React,{Component} from "react"
import ProjectServices from "../service/project-services"
import{Link} from "react-router-dom"
import Comment from "./comments"
// imagen
// quitar id
// modify roles
//añadir comentarios

class ProjectDetail extends Component{
  constructor(props){
    super(props)
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
  roles = () => {
    if (this.state.project.roles) {
      if (this.state.project.roles.length) {
        return this.state.project.roles.map((e,i) => {
          return <div key={i}><p>{e.role}</p><p> {e.number}</p></div>
        })
      } else {
        return <p>Your project has no needed roles</p>
      }
    }
  }
  users = () => {
    if (this.state.project.user) {
      console.log(this.state.project.user)
      if (this.state.project.user.length) {
        console.log(this.state.project.user)
        return this.state.project.user.map((e,i) => {
          return <div key={i}><p>{e.username},{e.role}</p></div>
        })
      } else {
        return <p>You dont have any comments</p>
      }
    }
  }  
  comments = () => {
    if (this.state.project.comments) {
      if (this.state.project.comments.length) {
        return this.state.project.comments.map((e,i) => {
          return (
           <Comment key={i} comment={e.comment} commenter={e.commenter.username} />
          )
        })
      } else {
        return (<div>
          <textarea id='textarea' autoComplete="on" autoCapitalize="sentence" placeholder="your comment here" rows="5" col="80" spellCheck="true"></textarea>
          <button onClick={this.sendComment}>Post Comment</button>
          <p>You dont have any comments</p></div>)
      }
    }
  }
  sendComment =(e)=>{
    console.log(document.querySelector('#textarea').value)
    this.services.comments(document.querySelector('#textarea').value, this.props.match.params.id)
    .then(() => console.log("comentario nuevo"))
  }
  render(){

    return(
      <React.Fragment>
      {this.state.project.user && this.state.project.author && 
      <div>
        <h1>{this.state.project.name}</h1>
        <img src={(this.state.project.imageUrl) ? this.state.project.imageUrl : "/images/chicken.jpg"} alt="#"></img>
        <p>Project name:  {this.state.project.name}</p>
        <div><p>User:</p>  {this.users()}</div>
        <div><p>Needed:</p> {this.roles()}</div>
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
        <textarea id='textarea' autoComplete="on" autoCapitalize="sentence" placeholder="your comment here" rows="5" col="80" spellCheck="true"></textarea>
        <button onClick={this.sendComment}>Post Comment</button>       
        <div>{this.comments()}</div>

      </div>
      }
      </React.Fragment>
    )
    
  }
}
export default ProjectDetail