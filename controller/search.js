const Competences = require("../models/competence");
const Profiles = require ("../models/profile.js")
const Users = require("../models/user")


exports.searchMentor = async (req,res,next) =>{
try{
  const results = await Competences.aggregate([{
    "$match":{
      "skillName":req.query.q
    }},
    {"$unwind":"$userArray"
    },
    {"$lookup":{
      "from":Profiles.collection.name,
      "localField":"userArray.profileID",
      "foreignField":"_id",
      "as":"profileDetails"
    }},
    {"$lookup":{
      "from":Users.collection.name,
      "localField":"profileDetails.userID",
      "foreignField":"_id",
      "as":"userDetails"
    }},
    {"$project":{
      "_id":0,
      "__v":0,
      "connection":0,
      "date":0,
      "userArray._id":0,
      // "userArray.available":0,
      "profileDetails._id":0,
      "profileDetails.__v":0,
      "profileDetails.userID":0,
      "profileDetails.connection":0,
      "profileDetails.medalBronze":0,
      "profileDetails.medalGold":0,
      "profileDetails.requestReceived":0,
      "profileDetails.requestSent":0,
      "profileDetails.date":0,
      "userDetails.password":0,
      "userDetails.__v":0,
      "userDetails.date":0,      
    }},
    {"$unwind":"$profileDetails"
    },
    {"$unwind":"$userDetails"
    },
    { "$sort" : 
    { "userArray.level" :-1} },
    {"$match":{
      "userArray.available":true
    }}
  ])
 return res.json(results)
}
catch(err){
  console.log(err)
  next(err)
  }
}


exports.profileMentor = async (req,res,next) => {
try{
  const results = await Profiles.findById(req.params.user_id,"-_id -connection -requestReceived -requestSent -__v -date").populate("userID","-_id -date -password -__v")
 return res.json(results)
  }
catch(err){
  console.log(err)
  next(err)
  }
}



// const results = await Competences.findOne({skillName:req.query.q}," -_id")
// .populate({
//   path:"userArray.profileID",
//   option:{sort:{"level":1}},
//   select:"companyCity userID -_id",
//   populate: {
//     path: "userID",
//     select:"lastName firstName email -_id",
//     model:"User"}})
//     const users = results.userArray.sort((a,b) => b.level.toString().localeCompare(a.level.toString())).filter(el => el.available === true)
// res.status(200).json({
//   skill:results.skillName,
//   users
// })
// } 



