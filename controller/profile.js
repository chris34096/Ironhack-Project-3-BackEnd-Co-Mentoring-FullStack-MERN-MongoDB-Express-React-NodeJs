const Profile = require("../models/profile");
const Competences = require("../models/competence");

exports.submitProfile = async (req, res, next) => {
  const {companyCity,skill1,skill2,skill3,skill1Level,skill2Level,skill3Level} = req.body
  const competencies = [{[skill1]:skill1Level},{[skill2]:skill2Level},{[skill3]:skill3Level}]
  const userID = req.user._id
  const option = { upsert: true, new: true ,setDefaultsOnInsert: true}
  let updateOne= {companyCity,competencies,userID}
  //Profile
  try{
  const result = await Profile.findOneAndUpdate({userID},updateOne,option).exec()
  res.status(201).json({msg:"Your profile has been created"})
  return next()
    // if(!result){
    //   const newProfile = new Profile({userID,competencies,companyCity})
    //   const createdProfile = await newProfile.save()
    //   res.status(201).json({msg: "Your profile has been created"})
    //   return next()
    // }else {
    //   const updatedProfile = await Profile.findOneAndUpdate({userID},{companyCity,competencies}).exec()
    //   res.status(201).json({msg:"Your profile has been updated"})
    //   return next()
    //   }
    }
  catch (err) {
        console.log(err)
        next(err);
        }
    }

exports.submitCompetence = async (req,res,next) => {
  try{
  const userID = req.user._id
  const {skill1,skill2,skill3,skill1Level,skill2Level,skill3Level} = req.body
  const arraySkill =[skill1,skill2,skill3]
  const arrayLevel =[skill1Level,skill2Level,skill3Level]
  for(let i = 0;i<3;i++){
  let updateOne= {"userArray.userID":userID,"userArray.level":arrayLevel[i]}
  const option = { upsert: true, new: true }
  await Competences.findOneAndUpdate({skillName:arraySkill[i],"userArray.userID":userID},updateOne,option)
  }
  res.json({msg:'succes'})
  console.log('hehe')
  }
catch(err){
  console.log(err)
  next(err)
}}
  
