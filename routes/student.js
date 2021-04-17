const express = require("express");
const { create, getall, getstudentbyId, markAttendance, getstudentbyRoll } = require("../controllers/student");
const router = express.Router();

router.post("/register", create);
router.get("/all", getall);
router.get("/one/:studentId", getstudentbyId);
router.get("/roll/:studentRoll", getstudentbyRoll);
router.put("/mark/:mac",markAttendance);

module.exports = router;

//TODO forgot passowrd api to be added
