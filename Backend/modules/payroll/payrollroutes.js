const express = require("express");
const{GenerateSlip}=require('./payrollcontroller')

const router = express.Router();

router.get("/Generate/:user",GenerateSlip)

module.exports = router;