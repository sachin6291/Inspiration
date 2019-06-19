import axios from 'axios'

export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: 'http://localhost:3000/api/',
       withCredentials: true 
    })
  }

  allProjects = () => {
    return this.service.get('allProjects', )
      .then(res => res.data)
      .catch(err => console.log('Error', err))
  }


  oneProject = id => {
    return this.service.get(`oneProject/${id}`)
      .then(res => res.data)
      .catch(err => console.log('Error', err))
  }
  newProject = project => {
    return this.service.post('newProject', project)
      .then(res => res.data)
      .catch(err => console.log(err))
  }
  editProject = (project, id) => {
    return this.service.post(`editProject/${id}`, project)
      .then(res => res.data)
      .catch(err => console.log(err))
  } 
  deleteProject = (project, id) => {
    return this.service.post(`deleteProject/${id}`, project)
      .then(res => res.data)
      .catch(err => console.log(err))
  } 
  joinProject =(project, id)=>{
    return this.service.post(`joinProject/${id}`, project)
      .then(res=>console.log(res))
  }
  comments=(project,id)=>{
    return this.service.post(`comments/${id}`, {comments:project})
    .then(res=>res.data)
    .catch(err=>console.log(err))
  }

  imagenUpload = theImg => {
    return this.service.post('upload-project', theImg)
      .then(res => res.data)
      .catch(err => console.log(err));
  }
}