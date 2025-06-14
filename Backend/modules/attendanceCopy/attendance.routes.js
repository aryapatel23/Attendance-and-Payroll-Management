const express = require("express");
const {
  getTodayAttendance,
  markAttendance,
  getAllAttendance,
} = require("./attendance.controller");

const router = express.Router();

router.get("/attendance/:userId", getTodayAttendance);
router.post("/mark-attendance", markAttendance);
router.get("/all-attendance", getAllAttendance);

module.exports = router;
