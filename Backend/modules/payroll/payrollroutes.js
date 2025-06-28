const express = require("express");
const{GenerateSlip}=require('./payrollcontroller')

const router = express.Router();

router.post("/Generate",GenerateSlip)

module.exports = router;