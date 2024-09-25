const express = require('express');
const { loginUser, getUser, checkEmail, signupUser } = require('../Controller/userController');
const User = require('../Models/userModel');
const userRouter = express.Router();


userRouter.post('/login', loginUser)
userRouter.get('/profile', getUser)
userRouter.get('/check-email', checkEmail)
userRouter.post('/signup', signupUser)
userRouter.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users); // 결과를 클라이언트에 반환
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = userRouter
