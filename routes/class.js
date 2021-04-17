const express = require("express");
const {
  createClass,
  getall,
  getClassbyId,
  addStudent,
  ShowStudents,
} = require("../controllers/class");

const router = express.Router();

router.post("/register", createClass);
router.get("/all", getall);
router.get("/one/:classId", getClassbyId);
router.put("/addstudent/:classId", addStudent);
router.get("/students/:classId", ShowStudents);
module.exports = router;

//TODO forgot passowrd api to be added
