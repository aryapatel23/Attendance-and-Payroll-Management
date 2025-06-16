const express = require('express');
const { getProfile,addUser } = require('./userController');
const authenticateToken = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', authenticateToken, getProfile);
router.post('/add', authenticateToken, addUser);


module.exports = router;
