const Profile = require("../models/profile");
const Competences = require("../models/competence");

exports.submitProfile = async (req, res, next) => {
  const {companyCity,skill1,skill2,skill3,skill1Level,skill2Level,skill3Level,available} = req.body
  const competencies = [{[skill1]:skill1Level},{[skill2]:skill2Level},{[skill3]:skill3Level}]
  const userID = req.user._id
  const option = { upsert: true, new: true ,setDefaultsOnInsert: true}
  let updateOne= {companyCity,competencies,userID,available}
  try{
  const result = await Profile.findOneAndUpdate({userID},updateOne,option).exec()
  return next()
    }
  catch (err) {
        console.log(err)
        next(err);
        }
    }

exports.submitCompetence = async (req,res,next) => {
  try{
  const userID = req.user._id
  const {skill1,skill2,skill3,skill1Level,skill2Level,skill3Level,available} = req.body
  const newSkills =[skill1,skill2,skill3]
  const arrayLevel =[skill1Level,skill2Level,skill3Level]
  // //Find the old one if difference then delete it
  // const oldSkills = await Competences.find({"userArray.userID":userID},"skillName")
  // if(oldSkills.length > 0){
  // const skillToDelete = oldSkills.filter(el => !newSkills.includes(el.skillName))
  //   if(skillToDelete.length > 0){
  // const abc = await Competences.findOneAndUpdate(
  //   {skillName:skillToDelete[0].skillName},
  //   {$pull:{userArray:{"userID":userID}}})
  // }}
  //Update and create if not exist

  for(let i = 0;i<3;i++){
  let createOne = {userID,level:arrayLevel[i],available}
  let pushOne = {$push:{"userArray":{userID,level:arrayLevel[i],available}}}
  const option = { upsert: true, new: true}
  //Create
  const skillExist = await Competences.findOne({skillName:newSkills[i]}) //check if skill doc is there
  if(!skillExist){
    await Competences.create({skillName:newSkills[i],userArray:createOne})
  } else{
   const userExist = await Competences.findOne({skillName:newSkills[i],"userArray.userID":userID})// User exist in this document or not
   console.log(userExist) //skill doc exist but there is no userID => false so push into Array
    if(!userExist){
      console.log("here")
      await Competences.findOneAndUpdate({skillName:newSkills[i]},pushOne)
    } else{
      console.log("hehe")
      await Competences.findOneAndUpdate(
      {skillName:newSkills[i],"userArray.userID":userID},
      {"userArray.$.userID":userID,"userArray.$.level":arrayLevel[i],"userArray.$.available":available})
    }
  }
  }
  res.status(201).json({msg:"Your profile has been created"})
  }
catch(err){
  console.log(err)
  next(err)
}}
  


