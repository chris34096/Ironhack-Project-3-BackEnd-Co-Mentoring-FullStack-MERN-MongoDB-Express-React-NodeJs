const Profile = require("../models/profile");
const User = require ("../models/user.js")
const Competences = require("../models/competence");
const validateProfileInput = require ('../validation/profile')

exports.submitProfile = async (req, res, next) => {
try{
  const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
    return res.status(400).json({errors});
    }
  const {firstName,lastName,companyCity,skill1,skill2,skill1Level,skill2Level,avatar,available} = req.body
  const competencies = [{[skill1]:skill1Level},{[skill2]:skill2Level}]
  const userID = req.user._id
  const option = { upsert: true, new: true ,setDefaultsOnInsert: true}
  let updateOne = null;
function checkInputEmpty(objectInput,objectstart){
      const keys = Object.keys(objectInput)
      return updateOne = keys.reduce((object,currVal) => {
        if(objectInput[currVal]) {
        object[currVal]= objectInput[currVal]}
        return object
      },objectstart)
    }
  const objectStart = {
    firstName : firstName,
    lastName : lastName,
    companyCity : companyCity,
    competencies:competencies
  }
  const objectInput = 
  {
    avatar:avatar,
    available:available
  }
  checkInputEmpty(objectInput,objectStart);
  const result = await Profile.findOneAndUpdate({userID},updateOne,option).exec()
  req.profileID = result._id
  await User.findByIdAndUpdate(userID,{hasProfile:true}).exec()
  return next()
    }
  catch (err) {
        console.log(err)
        next(err);
        }
    }

exports.submitCompetence = async (req,res,next) => {
  try{
  const {skill1,skill2,skill1Level,skill2Level,available} = req.body
  const newSkills =[skill1,skill2]
  const arrayLevel =[skill1Level,skill2Level]
  let profileID = req.profileID
  console.log(profileID)
  //Find the old one if difference then delete it
  const oldSkills = await Competences.find({"userArray.profileID":profileID},"skillName")
  if(oldSkills.length > 0){
  const skillToDelete = oldSkills.filter(el => !newSkills.includes(el.skillName))
  console.log("Skill to delete " + skillToDelete)
    if(skillToDelete.length > 0){
  const abc = await Competences.findOneAndUpdate(
    {skillName:skillToDelete[0].skillName},
    {$pull:{userArray:{"profileID":profileID}}}
    )
  }}

  //Update and create if not exist
  for(let i = 0;i<2;i++){
  let createOne = {profileID,level:arrayLevel[i],available}
  let pushOne = {$push:{"userArray":{profileID,level:arrayLevel[i],available}}}
  // const option = { upsert: true, new: true,}
  //Create
  const skillExist = await Competences.findOne({skillName:newSkills[i]}) //check if skill doc is there
  if(!skillExist){
    await Competences.create({skillName:newSkills[i],userArray:createOne})
  } else{
   const userExist = await Competences.findOne({skillName:newSkills[i],"userArray.profileID":profileID})// User exist in this document or not
    //skill doc exist but there is no userID => false so push into Array
    if(!userExist){
      await Competences.findOneAndUpdate({skillName:newSkills[i]},pushOne)
    } else{
      await Competences.findOneAndUpdate(
      {skillName:newSkills[i],"userArray.profileID":profileID},
      {"userArray.$.profileID":profileID,"userArray.$.level":arrayLevel[i],"userArray.$.available":available})
    }
  }}
  return res.status(201).json({msg:"Your profile has been created"})
  }
catch(err){
  console.log(err)
  next(err)
}}


exports.getProfile = async (req, res, next) => {
  try{
  // const userID = req.user._id;
  const userID = req.query.q
  const profile = await Profile
  .findOne({userID},"firstName lastName competencies companyCity available avatar connection requestReceived requestSent")
  if(profile){
    return res.status(201).json({profile})
  }
  return res.status(201).json({message:"No User"})
}
catch(err){
  console.log(err)
  next(err)
}}