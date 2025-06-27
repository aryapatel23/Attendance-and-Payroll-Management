const express = require("express");
const{GenerateSlip}=require('./payrollcontroller')

const router = express.Router();

router.get("/Generate",GenerateSlip)

module.exports = router;