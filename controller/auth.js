const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keyJwt = require('../config/keys').secretKey
const validateRegisterInput = require('../validation/signup')


exports.login = (req,res,next) => {
 const {email,password} = req.body;
  User.findOne({email:email})
    .then(user => {
      //check for user
      if(!user){
        return res.status(404).json({msg:'User not found'})
      }
      //check password
      bcrypt
      .compare(password,user.password)
      .then(isMatch => {
        if(isMatch){
          //user matched
          const payload ={userId :user._id.toString(), email:user.email}
          //Sign token
          jwt.sign(
            payload,
            keyJwt,
            {expiresIn:"7d"},
            (err,token)=> {
              res.status(200).json({
                succes:true,
                token: "Bearer "+ token
              })
          });
        } else {
          return res.status(400).json({msg:'Password incorrect'})
        }
      })
    })
}


exports.signup = (req,res,next) =>{
  console.log(req.body)
  const {errors, isValid} = validateRegisterInput(req.body);
  console.log(validateRegisterInput(req.body))
  if(!isValid){
    console.log(isValid)
    return res.status(400).json({errors})
  }
  console.log("hehe")
  const {firstName,lastName,email,password} = req.body
  User.findOne({email: email})
  .then(user => {
    if(user){
      return res.status(400).json({msg:'Email already exists.'});
    }
      return bcrypt
      .hash(password,12)
      .then(hashedPassword => {
        const newUser = new User ({
          lastName:lastName,
          firstName: firstName,
          email:email,
          password:hashedPassword
        });
        return newUser.save();
      })
      .then(user  => res.status(201).json({message:'User created!'}))
      .catch(err => {
        console.log(err)
      })
    })
  }