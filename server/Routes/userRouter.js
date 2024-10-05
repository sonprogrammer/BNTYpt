const express = require('express');
const { checkEmail, signupUser, loginRegularUser, loginKakaoUser } = require('../Controller/userController');
const userRouter = express.Router();



userRouter.post('/login/regular', loginRegularUser)
userRouter.post('/login/kakao', loginKakaoUser)
userRouter.get('/check-email', checkEmail)
userRouter.post('/signup', signupUser)


module.exports = userRouter
