const Student = require("../models/student");
var MAC_ADDRESS = require("is-mac-address");
// create student
exports.create = async (req, res) => {

    if(!req.body.rollno||!req.body.macaddress)
    {
        return res.status(400).json({
            error:"roll no and mac address are required"
        });

    }

    if(!MAC_ADDRESS.isMACAddress(req.body.macaddress))
    {
        return res.status(404).json("invalid mac address");
    }
  const newStudent = new Student({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    macaddress:req.body.macaddress,
    rollno:req.body.rollno
    
  });

  try {
    await newStudent.save();
  } catch (error) {
    if (error) return res.status(400).json(error);
  }
  res.json({
    msg: "Student Registered success",

    student:newStudent
  });
};

// get all student
exports.getall= async(req,res)=>{

    let student;
    try{
        student = await Student.find({});
        
    }
    catch(error)
    {
        if(error)
        {
            return res.status(500).json({
                error:error
            })
        }
    }
    res.status(200).json(student);
    
};

// get student by id
exports.getstudentbyId = async(req,res)=>{
    // console.log(req.params);

    let student;
    try {
      student = await Student.findById(req.params.studentId);
    //   console.log(student);
    } catch (error) {
      if (error) {
        return res.status(500).json({
          error: error,
        });
      }
    }
    res.status(200).json({student});

}

// get student by roll no
exports.getstudentbyRoll = async(req,res)=>{
    // console.log(req.params);

    let student;
    try {
      student = await Student.findOne({
        rollno: req.params.studentRoll
      });
    //   console.log(student);
    } catch (error) {
      if (error) {
        return res.status(500).json({
          error: error,
        });
      }
    }
    res.status(200).json({student});

}

// attendence marker
exports.markAttendance = async(req,res)=>{

    let student;
    try {
        student= await Student.findOneAndUpdate({mac:req.params.mac},{
            $inc:{
                cnt:1
            }
        })
        
    } catch (error) {
        if(error)
        {
            return res.status(400).json(error);
        }
        
    }
    await student.save();
    res.status(200).json(student);

}
