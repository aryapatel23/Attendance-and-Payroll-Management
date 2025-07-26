const express = require("express");
const router = express.Router();
const { setPassword,sendWelcomeMail } = require("./mailcontrollers");

router.post("/set-password", setPassword);
router.post("/send-welcome-mail", sendWelcomeMail);

module.exports = router;

