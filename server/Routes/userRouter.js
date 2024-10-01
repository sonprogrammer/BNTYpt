const express = require('express');
const { getUser, checkEmail, signupUser, loginRegularUser, loginKakaoUser } = require('../Controller/userController');
const User = require('../Models/userModel');
const userRouter = express.Router();


userRouter.post('/login/regular', loginRegularUser)
userRouter.post('/login/kakao', loginKakaoUser)
userRouter.get('/profile', getUser)
userRouter.get('/check-email', checkEmail)
userRouter.post('/signup', signupUser)
userRouter.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users); 
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = userRouter
