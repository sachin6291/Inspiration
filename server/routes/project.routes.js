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
    .populate("user", "username")
    .populate("author")
    .then(data => res.json(data))
    .catch(err => console.log('Error:', err))
})
router.post('/newProject', (req, res)=>{
  const { name, description,user, role} = req.body
  User.find({username: user})
    .then(found=>{
      const idUser= found[0]._id
      Project.create({ name, description, author: req.user._id, role, })
      .then(project => {
        Project.findByIdAndUpdate(project._id ,
          {$push: { user: idUser }}
        )
          .then(response=>{
            res.json(response)
          })
      })
      .catch(err => console.log('Error:', err))})
  
})
router.post('/editProject/:id'), (req, res)=>{
  Project.findByIdAndUpdate(req.params.id, {})
    .then(data => res.json(data))
    .catch(err => console.log('Error:', err))
}
router.post('/deleteProject/:id', (req, res)=>{
  Project.findByIdAndDelete(req.params.id)
    .then(data => res.json(data))
    .catch(err => console.log('Error:', err))
})
module.exports = router;
