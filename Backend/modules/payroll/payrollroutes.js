const express = require("express");
const{GenerateSlip,Addsalaryinfo}=require('./payrollcontroller')

const router = express.Router();

router.post("/Generate",GenerateSlip)
router.post("/AddSlaryinfo",Addsalaryinfo)

module.exports = router;