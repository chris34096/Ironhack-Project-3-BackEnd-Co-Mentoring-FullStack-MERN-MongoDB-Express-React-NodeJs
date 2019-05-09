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
      "as":"profile-details"
    }},
    {"$lookup":{
      "from":Users.collection.name,
      "localField":"profile-details.userID",
      "foreignField":"_id",
      "as":"user-details"
    }},
    {"$project":{
      "_id":0,
      "__v":0,
      "connection":0,
      "date":0,
      "userArray._id":0,
      // "userArray.available":0,
      "profile-details._id":0,
      "profile-details.__v":0,
      "profile-details.userID":0,
      "profile-details.connection":0,
      "profile-details.medalBronze":0,
      "profile-details.medalGold":0,
      "profile-details.requestReceived":0,
      "profile-details.requestSent":0,
      "profile-details.date":0,
      "user-details.password":0,
      "user-details.__v":0,
      "user-details.date":0,      
    }},
    {"$unwind":"$profile-details"
    },
    {"$unwind":"$user-details"
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
  const results = await Profiles.findById(req.query.id,"-_id -connection -requestReceived -requestSent -__v -date").populate("userID","-_id -date -password -__v")
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



