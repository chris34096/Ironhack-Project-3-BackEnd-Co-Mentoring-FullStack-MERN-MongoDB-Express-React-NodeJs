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
    required:true
  },
  // avatar:{
  //   type:String,
  //   required:true,
  // },
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
    date:{type:Date,default:Date.now}
  }],
  requestSent:[{
    _id : false, 
    userID:{
    type:Schema.Types.ObjectId,
    ref:"User"},
    date:{
      type:Date,default:Date.now
    }}],
  connection:[{ 
    userID:{
    type:Schema.Types.ObjectId,
    ref:"User"
    },
    date:{type:Date,default:Date.now}}],
  available:{
    type:Boolean,
    default:true
  },
  date:{
    type:Date,
    default:Date.now
  }
}
);

module.exports = mongoose.model("Profile", ProfileSchema);