const express = require("express");
const { create, getall, getstudentbyId, markAttendance, getstudentbyRoll, resetStudents } = require("../controllers/student");
const router = express.Router();

router.post("/register", create);
router.get("/all", getall);
router.get("/one/:studentId", getstudentbyId);
router.get("/roll/:studentRoll", getstudentbyRoll);
router.put("/mark/:secret/:mac",markAttendance);
router.put("/reset/:secret",resetStudents);

module.exports = router;

//TODO forgot passowrd api to be added
