const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create user Schema & Model
const type = [{type:Schema.Types.ObjectId,ref:"User",date:{type:Date,default:Date.now}}];
const ProfileSchema = new Schema({
  userID:{
    type:Schema.Types.ObjectId,
    ref:"User",
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
    type:Number
  },
  medalGold:{
    type:Number
  },
  RequestReceived:type,
  RequestSent:type,
  Connection:type,
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);