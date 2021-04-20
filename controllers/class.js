const Class = require("../models/class");
// create Class

const StudentSchema= require("../models/student")
exports.createClass = async (req, res) => {
  if (!req.body.teacher || !req.body.course || !req.body.courseId) {
    return res.status(400).json({
      error: "Teacher and course are required",
    });
  }

  const newClass = new Class({
    teacher: req.body.teacher,
    course: req.body.course,
    courseId:req.body.courseId
  });

  try {
    await newClass.save();
  } catch (error) {
    if (error) return res.status(400).json(error);
  }
  res.json({
    msg: "Class Registered success",

    Class: newClass,
  });
};

// get all Class
exports.getall = async (req, res) => {
  let clas;

  try {
    clas=await Class.find({});
  } catch (error) {
    if (error) {
      return res.status(500).json({
        error: error,
      });
    }
  }
  res.status(200).json(clas);
};

// get Class by id
exports.getClassbyId = async (req, res) => {
  // console.log(req.params);

  let cl;
  try {
    cl = await Class.findById(req.params.classId);
    //   console.log(Class);
  } catch (error) {
    if (error) {
      return res.status(500).json({
        error: error,
      });
    }
  }
  res.status(200).json( cl );
};

// add student to class;
exports.addStudent = async (req, res) => {
  // console.log(req.params);

  let cl;
  try {
    cl = await Class.findById(req.params.classId);
    if(!cl)
    {
      return res.status(400).json({
        error:"class not found"
      })
    }
  } catch (error) {
    if (error) {
      return res.status(500).json({
        error: error,
      });
    }
  }

  let st= await StudentSchema.findOne({rollno:req.body.rollno});
  if(!st)
  {
    return res.status(400).json({
      error:"student not found"
    })
  }
  try {
    await cl.update({
      $addToSet: {
        students: {
          _id: st._id,
        },
      },
    });
    await cl.save();
    
  } catch (error) {

    return res.status(500).json({error});
    
  }
  return res.status(200).json(cl);
  
};

exports.ShowStudents= async (req,res)=>{

  let cl;
  try{

    cl= await Class.findOne({_id:req.params.classId});
    if(!cl)
    {
      return res.status(404).json({error:"class not found"});
    }
  }
  catch(error)
  {
    if(error)
    return res.status(400).json(error);
  }

  await cl.populate("students").execPopulate();

  return res.status(200).json(cl.students);

}