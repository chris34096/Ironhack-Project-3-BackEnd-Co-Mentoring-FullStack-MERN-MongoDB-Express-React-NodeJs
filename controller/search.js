const Competences = require("../models/competence");
const Profiles = require ("../models/profile.js")



exports.searchMentor = async (req,res,next) =>{
const results = await Competences.findOne({skillName:req.query.q}).populate("userArray.profileID")

res.status(200).json(results)
} 

// exports.searchMentor = async (req,res,next) =>{
//   const results = await Profiles.find({companyCity:"Paris"}).populate("userID")
//   res.status(200).json(results)
//   } 