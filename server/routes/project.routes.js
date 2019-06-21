const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Project =require("../models/project.model");

router.get('/allProjects', (req, res)=>{
  Project.find()
    .then(data => res.json(data))
    .catch(err => console.log('Error:', err))
})
router.get('/oneProject/:id', (req, res)=>{
  Project.findById(req.params.id)
  .populate('user', 'username role' )
  .populate("comments.commenter", "username")
   .populate("author")
    .then(data => {console.log(data)
      res.json(data)})
    .catch(err => console.log('Error:', err))
})
router.post('/editProject/:id', (req, res)=>{
  const{name, description, roles} = req.body
  Project.findByIdAndUpdate(req.params.id, 
    {name, description, roles}, {new:true}
  )
    .then(data => res.json(data))
    .catch(err => console.log('Error:', err))
})  

router.post("/joinProject/:idProject", (req, res) => {
  Project.findById(req.params.idProject)
  .then(project => {
    if(project.role.includes(req.user.role)&& !project.user.includes(req.user._id)){
      project.updateOne({$push:{user:req.user._id}})
      .then(msg => { console.log(msg);
        res.status(200).json({msg:`${req.user.username} joined the project`})
      })
    } else {
      res.status(403).json({ msg:"You don't fit the necessary Role or allready the member"})
    }
  })
})
router.post("/leaveProject/:id", (req,res)=>{
  Project.findById(req.params.idProject)
  .then(project=>{
    console.log(project.role, req.user)
    if(project.user.includes(req.user._id)){
      project.deleteOne()
      .then(msg=>{
        console.log(msg)
        res.status(200).json({msg:`${req.user.username} has succesfully left project ${project.name}`})
      })
    }else{
      res.status(403).json({ msg: "Error" })
    }
  })
})
router.post('/deleteProject/:id', (req, res)=>{
  Project.findById(req.params.id)
    .then(project => {
      console.log(project)
      if(req.user._id === project.author){
        project.deleteOne()
        .then(msg=>{
          console.log(msg)
          res.status(200).json({msg:`${project.name} was Deleted`})
        })
      }else{
        res.status(403).json({msg:"This is not your project"})
      }
    })
})
router.post("/comments/:id",(req,res)=>{
  let{comments}=req.body
  const newComments = {
    comment:comments,
    commenter:req.user._id
  }
  Project.findByIdAndUpdate(req.params.id, { $push: { comments: newComments}}, {new:true})
    .populate("comments.commenter")
  .then(project=>{
    console.log(project)
    res.json(project)
  })
  .catch(err=>console.log(err))
})
router.post('/newProject', (req, res)=>{
  let { name, description, roles, imageUrl} = req.body
  role = role.filter(e=>e.role && e.number>0)
  Project.create({ name, description, author: req.user._id, roles, imageUrl})
      .then(project => {
        console.log(project)
        res.json(project)})
      .catch(err => console.log('Error:', err))
    
  
})
module.exports = router;
