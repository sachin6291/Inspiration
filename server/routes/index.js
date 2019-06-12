const express = require('express');
const router  = express.Router();

const Project = require("../models/project.model")

router.get('/getAllProjects', (req, res) => {
  Project.find()
    .then( data => res.json(data))
    .catch(err=> console.log("error", err)) 
});
router.get("/getOneProject/:id", (req, res)=>{
  Project.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => console.log("error", err))
})

module.exports = router;
