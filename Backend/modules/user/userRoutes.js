const express = require('express');
const { getProfile,addUser,alluser,userByid } = require('./userController');
const authenticateToken = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', authenticateToken, getProfile);
router.post('/add', addUser);
router.get('/all', alluser);
router.get('/users/:user_id',  userByid);

module.exports = router;
