const express = require("express");
const{GenerateSlip,Addsalaryinfo,Updatesalaryinfo}=require('./payrollcontroller')

const router = express.Router();

router.post("/Generate",GenerateSlip)
router.post("/AddSlaryinfo",Addsalaryinfo)
router.post("/Updatesalaryinfo",Updatesalaryinfo)

module.exports = router;