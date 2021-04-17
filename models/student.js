require("dotenv").config();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var StudentSchema = new Schema({
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  rollno: {
    type: String,
    max: 8,
    required: true,
    unique: true,
  },
  mac: {
    type: String,
    max: 12, //6 octet
    required: true,
    unique: true,
  },
  cnt: {
    type: Number,
    default: 0,
  },
});

StudentSchema.virtual("macaddress").set(function (macaddress) {
    const macparts=String(macaddress).split(':');
    let parts="";
    macparts.forEach((part)=>{
        
        parts+=parseInt(part, 16).toString(16);
    });
    console.log(parts);
    this.mac=parts;
}).get(function(){
    return this.mac;
})
module.exports = mongoose.model("Student", StudentSchema);
