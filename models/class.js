require("dotenv").config();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ClassSchema = new Schema({
  teacher: {
    type: String,
    default: "",
    required:true
  },
  course: {
    type: String,
    default: "",
    required:true,
    
  },
  courseId:{
    type:String,
    required:true,
    unique:true
    
  },
  
  students:[{type:Schema.Types.ObjectId,ref:"Student",unique:true}]
});
module.exports = mongoose.model("Class", ClassSchema);
