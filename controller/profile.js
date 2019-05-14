const Profile = require("../models/profile");
const Competences = require("../models/competence");
const validateProfileInput = require ('../validation/profile')
const validateCompetenceInput = require ('../validation/competences')

 

exports.submitProfile = async (req, res, next) => {
  //Function to check if empty ou pas avoid null in database when data is empty
  try{
    function checkInputEmpty(objectInput,objectstart){
      const keys = Object.keys(objectInput)
      return updateOne = keys.reduce((object,currVal) => {
        if(objectInput[currVal]) {
        object[currVal]= objectInput[currVal]}
        return object
      },objectstart)
    }
  let updateOne;
  const option = { upsert: true, new: true ,setDefaultsOnInsert: true}
  const {firstName,lastName,companyCity,skill1,skill2,skill1Level,skill2Level,avatar,available} = req.body 
  const userID = req.user._id
  //Check if userProfile is existing
  const isHasProfile = await Profile.findOne({userID}).exec()
    //userProfile exist
  if(isHasProfile){
    let competencies=[]
    //For competencies
    const { errors, isValid } = validateCompetenceInput({skill1,skill2,skill1Level,skill2Level})
    if (!isValid) {
    return res.status(400).json({errors});
    }
    const objectInput = 
    {
      avatar:avatar,
      available:available,
      firstName : firstName,
      lastName : lastName,
      companyCity : companyCity,
    }
    checkInputEmpty(objectInput,{});
    // Push skill into competences array
    if(skill1) {
      competencies.push({[skill1]:skill1Level})
    }
    if(skill2){
      competencies.push({[skill2]:skill2Level})
    }
    //Check if array is empty or not to push into updateOne
    competencies.length > 0 ? updateOne = {...updateOne,competencies} : null
    const result = await Profile.findOneAndUpdate({userID},updateOne).exec()
    req.profileID = result._id
    return res.status(201).json({msg:"Your profile has been updated"})
    // return next()
  } 


  //userProfile not exist
    else { 
    console.log(req.body)
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
    return res.status(400).json({errors});
    }
    let competencies = [{[skill1]:skill1Level},{[skill2]:skill2Level}]
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
    return res.status(201).json({msg:"Your profile has been created"})
    // return next()
  }
  }
  catch (err) {
        console.log(err)
        next(err);
        }
    }

// exports.submitCompetence = async (req,res,next) => {
//   try{
//   const {skill1,skill2,skill1Level,skill2Level,available} = req.body
//   const newSkills =[skill1,skill2]
//   const arrayLevel =[skill1Level,skill2Level]
//   let profileID = req.profileID
//   //Find the old one if difference then delete it
//   const oldSkills = await Competences.find({"userArray.profileID":profileID},"skillName")
//   if(oldSkills.length > 0){
//   const skillToDelete = oldSkills.filter(el => !newSkills.includes(el.skillName))
//     if(skillToDelete.length > 0){
//   const deleteSkill = await Competences.findOneAndUpdate(
//     {skillName:skillToDelete[0].skillName},
//     {$pull:{userArray:{"profileID":profileID}}}
//     )
//   }}

  

//   //Update and create if not exist
//   for(let i = 0;i<2;i++){
//   let createOne = {profileID,level:arrayLevel[i],available}
//   let pushOne = {$push:{"userArray":{profileID,level:arrayLevel[i],available}}}
//   // const option = { upsert: true, new: true,}
//   //Create
//   const skillExist = await Competences.findOne({skillName:newSkills[i]}) //check if skill doc is there
//   if(!skillExist){
//     await Competences.create({skillName:newSkills[i],userArray:createOne})
//   } else{
//    const userExist = await Competences.findOne({skillName:newSkills[i],"userArray.profileID":profileID})// User exist in this document or not
//     //skill doc exist but there is no userID => false so push into Array
//     if(!userExist){
//       await Competences.findOneAndUpdate({skillName:newSkills[i]},pushOne)
//     } else{
//       await Competences.findOneAndUpdate(
//       {skillName:newSkills[i],"userArray.profileID":profileID},
//       {"userArray.$.profileID":profileID,"userArray.$.level":arrayLevel[i],"userArray.$.available":available})
//     }
//   }}
//   return res.status(201).json({msg:"Your profile has been created"})
//   }
// catch(err){
//   console.log(err)
//   next(err)
// }}
  


