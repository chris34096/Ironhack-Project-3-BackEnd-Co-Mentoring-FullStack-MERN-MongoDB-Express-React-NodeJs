const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keyJwt = require('../config/keys').secretKey
const validateRegisterInput = require('../validation/signup')
const validateLoginInput = require ('../validation/login')


exports.login = (req,res,next) => {
const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json({errors});
  }
 const {email,password} = req.body;
  User.findOne({email:email})
    .then(user => {
      //check for user
      if(!user){
        errors.email = 'User not found';
        return res.status(404).json({errors})
      }
      //check password
      bcrypt
      .compare(password,user.password)
      .then(isMatch => {
        if(isMatch){
          //user matched
          const payload ={userId :user._id.toString(), email:user.email,hasProfile:user.hasProfile}
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
          errors.password = 'Password incorrect';
          return res.status(400).json({errors})
        }
      })
    })
}


exports.signup = (req,res,next) =>{
  const {errors, isValid} = validateRegisterInput(req.body);
  if(!isValid){
    return res.status(400).json({errors})
  }
  const {email,password} = req.body
  User.findOne({email: email})
  .then(user => {
    if(user){
      errors.email = 'Email already exists.'
      return res.status(400).json({errors});
    }
      return bcrypt
      .hash(password,12)
      .then(hashedPassword => {
        const newUser = new User ({
          email:email,
          password:hashedPassword
        });
        return newUser.save();
      })
      .then(user  => res.status(201).json({message:'Account created!'}))
      .catch(err => {
        console.log(err)
      })
    })
  }