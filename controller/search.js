const Competences = require("../models/competence");
const Profiles = require ("../models/profile.js")


exports.searchMentor = async (req,res,next) =>{

  const results = await Competences.aggregate([{
    "$match":{
      "skillName":req.query.q
    }},
    {"$project":{
      "_id":0,
      "userArray":{
        "$filter":{
          "input":"$userArray",
          "as":"userArray",
          "cond":{
            "$eq":["$$userArray.available",true]
          }
        }
      }
    }},
    {"$unwind":"$userArray"
    },
    { "$sort" : 
    { "userArray.level" :-1} }
  ])
  res.json(results)
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



// exports.profileMentor = async (req)