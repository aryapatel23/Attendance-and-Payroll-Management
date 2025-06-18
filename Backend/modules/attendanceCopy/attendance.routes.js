const express = require("express");
const {
  getTodayAttendance,
  markAttendance,
  getAllAttendance,
  getAllusersAttendanceByMonth
} = require("./attendance.controller");

const router = express.Router();

router.get("/attendance/:userId", getTodayAttendance);
router.post("/mark-attendance", markAttendance);
router.get("/all-attendance", getAllAttendance);
router.get("/attendance/:userId/:month", getAllusersAttendanceByMonth);

module.exports = router;
