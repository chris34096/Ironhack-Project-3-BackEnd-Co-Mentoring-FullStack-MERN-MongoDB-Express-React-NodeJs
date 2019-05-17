const Competences = require("../models/competence");
const Profiles = require ("../models/profile.js")
const Users = require("../models/user")

exports.sendRequest = async (req,res,next) => {
  const userSend = req.user._id
  const userReceive = req.query.user_id
  const message = req.body.message
  
  const fullNameRece = req.query.fullNameRece
  const fullNameSent = req.query.fullNameSent
  //Put request to the db of requester
  try{
  await Profiles.findOneAndUpdate({"userID":userSend},
    {$push:{"requestSent":{userID: userReceive, fullName :fullNameRece}}})
  //put request to the db of receiver
  await Profiles.findOneAndUpdate({"userID":userReceive},
    {$push:{"requestReceived":{userID:userSend,message, fullName:fullNameSent}}})
  
  res.status(200).json({msg:"Your request connect has been sent"})
  }
  
  catch(err){
    console.log(err)
    next(err)
  }}
  
  
  exports.acceptRequest = async (req,res,next) => {
    const userAccept = req.user._id
    const userPending = req.query.user_id
    const fullNameAccept = req.query.fullNameAccept
    const fullNameSent = req.query.fullNameSent
    try{
      await Profiles.findOneAndUpdate({"userID":userAccept},{
        $push:{"connection":{"userID":userPending, fullName :fullNameSent }},
        $pull:{"requestReceived":{"userID":userPending}}
      })
      await Profiles.findOneAndUpdate({"userID":userPending},{
        $push:{"connection":{"userID":userAccept,fullName :fullNameAccept}},
        $pull:{"requestSent":{"userID":userAccept}}
      })
      res.status(200).json({msg:"Connected"})
    }
    catch(err){
      console.log(err)
      next(err)
    }
  }
  
  exports.refuseRequest = async (req,res,next) => {
    const userRefuse = req.user._id
    const userSent =req.query.user_id
    try{
      await Profiles.findOneAndUpdate({"userID":userRefuse},{
        $pull:{"requestReceived":{"userID":userSent}}
      })
      await Profiles.findOneAndUpdate({"userID":userSent},{
        $pull:{"requestSent":{"userID":userRefuse}}
      })
      res.status(200).json({msg:"Refused"})
    }
    catch(err){
      console.log(err)
      next(err)
    }
  }

  exports.cancelRequest = async (req,res,next) => {
    const userCancel = req.user._id
    const userRecec =req.query.user_id
    try{
      await Profiles.findOneAndUpdate({"userID":userRecec},{
        $pull:{"requestReceived":{"userID":userCancel}}
      })
      await Profiles.findOneAndUpdate({"userID":userCancel},{
        $pull:{"requestSent":{"userID":userRecec}}
      })
      res.status(200).json({msg:"Canceled"})
    }
    catch(err){
      console.log(err)
      next(err)
    }
  }

  exports.endConnection = async (req,res,next) => {
    const userEnd = req.user._id
    const userBeDeleted =req.query.user_id
    try{
      await Profiles.findOneAndUpdate({"userID":userEnd},{
        $pull:{"connection":{"userID":userBeDeleted}}
      })
      await Profiles.findOneAndUpdate({"userID":userBeDeleted},{
        $pull:{"connection":{"userID":userEnd}}
      })
      res.status(200).json({msg:"End"})
    }
    catch(err){
      console.log(err)
      next(err)
    }
  }