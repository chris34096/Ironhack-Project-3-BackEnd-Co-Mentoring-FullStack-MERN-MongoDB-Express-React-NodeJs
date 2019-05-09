const Competences = require("../models/competence");
const Profiles = require ("../models/profile.js")


exports.searchMentor = async (req,res,next) =>{
const results = await Competences.findOne({skillName:req.query.q}," -_id")
.populate({
  path:"userArray.profileID",
  option:{sort:{"level":1}},
  select:"companyCity userID -_id",
  populate: {
    path: "userID",
    select:"lastName firstName email -_id",
    model:"User"}})

res.status(200).json(results)
} 



// exports.profileMentor = async (req)