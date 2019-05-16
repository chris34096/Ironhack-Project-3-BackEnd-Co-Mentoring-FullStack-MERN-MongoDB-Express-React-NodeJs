const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create user Schema & Model
const ProfileSchema = new Schema({
  userID:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  firstName : {
    type:String,
    required:true
  },
  lastName :{
    type:String,
    required:true
  },
  companyCity: {
    type: String,
    required: true,
  },
  competencies:{
    type:Array,
    required:true,
  },
  avatar:{
    type:String,
    default:"https://res.cloudinary.com/dcmvim0u6/image/upload/v1557839812/27-270956_mario-face-png-super-mario-face-png_oczjbj.jpg",
    required:true
  },
  medalBronze:{
    type:Number,
    default:0
  },
  medalGold:{
    type:Number,
    default:0
  },
  requestReceived:[{ 
    _id : false,
    userID:{
    type:Schema.Types.ObjectId,
    ref:"User"},
    message:{
      type:String,
      default:"Hello, i would like to connect with you"
    },
    fullName:"",
    date:{type:Date,default:Date.now}
  }],
  requestSent:[{
    _id : false, 
    userID:{
    type:Schema.Types.ObjectId,
    ref:"User"},
    fullName:"",
    date:{
      type:Date,default:Date.now
    }}],
  connection:[{ 
    userID:{
    type:Schema.Types.ObjectId,
    ref:"User"
    },
    fullName:"",
    date:{type:Date,default:Date.now}}],

  available:{
    type:Boolean,
    default:true,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  }
}
);

module.exports = mongoose.model("Profile", ProfileSchema);