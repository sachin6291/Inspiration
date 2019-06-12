const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/user.model");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 15;

authRoutes.post('/signup', (req, res, next)=>{
  const username = req.body.username;
  const password = req.body.password;
  
  //si teienes los campos vacios
  if(!username || !password){
    res.status(400).json({message: "Provide username and password"})
    return
  }
  //para pedir que longitud minima de password sea 4
  if(password.length < 4){
    res.status(400).json({message: "Password must be at least 4 characters long"})
    return
  }
  // comporbante de username
  User.findOne({ username}, (err, foundUser) => {
    // error al connecion
    if(err){
      res.status(500).json({ message: "Error could not check username availability"})
      return
    }
    // existe usuario con ese nombre
    if(foundUser){
      res.status(400).json({ message: "username is already in use, try another username"})
      return
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    
    const newUser = new User({
      //username : username es redundante
      username ,
      password : hashPass
    }) 
    // Guardar el usuario nuevo
    newUser.save(err=>{
      // si hay un error al guardar
      if(err){
        res.status(400).json({ message:"Error at saving user."})
      }
      // auto login despueds del signup
      req.logIn(newUser, (err)=>{
        //si el auto login falla
        if (err){
          console.log(err)
          res.status(500).json({ message:"auto-login after sign-up error"})
        return
        }
        res.status(200).json(newUser)
      })
    })
  })
})

// ruta de login con la autentificacion de passport
authRoutes.post("/login", (req, res,next)=>{
  passport.authenticate("local",(err, theUser, failureDetails)=>{
    if (err){
      res.status(500).json({ message: "Error at authentication"})
      return
    }
    // aqui se usa failureDetails porque ya tenemos los datos en LocalStrategy
    if (!theUser){
      res.status(401).json(failureDetails)
      return
    }
    req.login(theUser, (err)=>{
      if (err){
        res.status(500).json({ message: "Session save Error"})
        return
      }
      res.status(200).json(theUser)
    })
  })
  (req, res, next)
})

authRoutes.post("/logout", (req, res, next)=>{
  req.logout();
  res.status(200).json({
    message:"logged out sucessfully"
  })
})

authRoutes.get("/loggedin", (req, res, next)=>{
  if(req.isAuthenticated()){
    res.status(200).json(req.user)
    return
  }
  res.status(403).json({message: "Unauthorized"})
})

module.exports = authRoutes;
