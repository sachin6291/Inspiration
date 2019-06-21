import React,{Component} from "react"
import ProjectServices from "../service/project-services"
import{Link} from "react-router-dom"
import Comment from "./comments"
import "./projectDetail.scss"
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
      .then(theProject=>{
        console.log(theProject)
        this.setState({project: theProject})})
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
          return <div key={i} className="detail-role"><p>{e.role} X </p><p> {e.number}</p></div>
        })
      } else {
        return <div className="detail-role"><p>Your project has no needed roles</p></div>
      }
    }
  }
  users = () => {
    if (this.state.project.user) {
      if (this.state.project.user.length) {
        console.log(this.state.project.user)
        return this.state.project.user.map((e,i) => <div key={i} className="detail-role"><p>{e.username},{e.role}</p></div>)
      } else {
        return <div className="detail-role"><p>No users registered</p></div>
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
          {/* <textarea id='textarea' autoComplete="on" autoCapitalize="sentence" placeholder="your comment here" rows="5" col="80" spellCheck="true"></textarea>
          <button onClick={this.sendComment}>Post Comment</button> */}
          <p>You dont have any comments</p></div>)
      }
    }
  }
  sendComment =(e)=>{
    console.log(document.querySelector('#textarea').value)
    this.services.comments(document.querySelector('#textarea').value, this.props.match.params.id)
    .then(response => {
      const _project = {...this.state.project};
      _project.comments = (response.comments)
      this.setState({
        project: _project 
      })
      document.querySelector('#textarea').value = ""
    })
  }
  render(){
    return(
      <React.Fragment>
      {this.state.project.user && this.state.project.author && 
      <div className="detail-bg">
        <div className="detail-all">
          <h1>{this.state.project.name}</h1>
          <img src={(this.state.project.imageUrl) ? this.state.project.imageUrl : "/images/chicken.jpg"} alt="#"></img>
          {/* <p>{this.state.project.name}</p> */}
            <div className="detail-label"><p className="underline">Needed:</p> {this.roles()}</div>
            <div className="detail-label"><p className="underline">Ocuppied:</p>  {this.users()}</div>
          <p className="underline">Project Description:</p>  <p className="bigger">{this.state.project.description}</p>
          <p className="underline">Project Author:</p> <p className="bigger">{this.state.project.author.username}</p>
          <div className="button-wraper">
            <div className="detail-button">
              {(this.state.msg) ? (<p>{this.state.msg}</p>) : null}
              {(this.state.project.author._id ===this.props.userInSession._id)?<Link to={`/projectEdit/${this.state.project._id}`}>Edit</Link>:null}
              <button onClick={this.handleMessage}>Join</button>
              {(this.state.project.author._id === this.props.userInSession._id) ? <button onClick={this.deleteProject}>Delete</button> : null}
            </div>
          </div>
          <div className="writeComment">
            <textarea id='textarea' autoComplete="on" autoCapitalize="sentence" placeholder="your comment here" rows="5" col="80" spellCheck="true"></textarea>
            <button onClick={this.sendComment}>Post Comment</button>       
          </div>
          <div className="comments-wraper">{this.comments()}</div>
        </div>
      </div>
      }
      </React.Fragment>
    )
    
  }
}
export default ProjectDetail