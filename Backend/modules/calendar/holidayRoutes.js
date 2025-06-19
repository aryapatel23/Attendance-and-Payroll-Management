const express = require('express');
const router = express.Router();
const { addHoliday, getHolidays } = require('./holidayController');

router.post('/add', addHoliday);
router.get('/', getHolidays);

module.exports = router;
