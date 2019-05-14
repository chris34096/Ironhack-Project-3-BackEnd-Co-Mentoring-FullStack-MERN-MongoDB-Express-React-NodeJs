const Competences = require("../models/competence");
const Profiles = require ("../models/profile.js")
const Users = require("../models/user")


exports.sendRequest = async (req,res,next) => {
const userSend = req.user._id
const userReceive = req.params.user_id
const message = req.body.message
//Put request to the db of requester
try{
await Profiles.findOneAndUpdate({"userID":userSend},
  {$push:{"requestSent":{userID: userReceive}}})
//put request to the db of receiver
await Profiles.findOneAndUpdate({"userID":userReceive},
  {$push:{"requestReceived":{userID:userSend,message}}})

res.status(200).json({msg:"Your request connect has been sent"})
}

catch(err){
  console.log(err)
  next(err)
}}


exports.acceptRequest = async (req,res,next) => {
  const userAccept = req.user._id
  const userPending = req.params.user_id
  try{
    await Profiles.findOneAndUpdate({"userID":userAccept},{
      $push:{"connection":{"userID":userPending}},
      $pull:{"requestReceived":{"userID":userPending}}
    })
    await Profiles.findOneAndUpdate({"userID":userPending},{
      $push:{"connection":{"userID":userAccept}}
    })
    res.status(200).json({msg:"Connected"})
  }
  catch(err){
    console.log(err)
    next(err)
  }
}
