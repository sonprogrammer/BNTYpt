const express = require('express');
const { checkEmail, signupUser, loginRegularUser, loginKakaoUser, logout } = require('../Controller/userController');
const { refreshToken } = require('../middleware/refresh');
const { authenticate } = require('../middleware/authenticate');
const userRouter = express.Router();



userRouter.post('/login/regular', loginRegularUser)
userRouter.post('/login/kakao', loginKakaoUser)
userRouter.get('/check-email', checkEmail)
userRouter.post('/signup', signupUser)
userRouter.post('/refresh', refreshToken)
userRouter.post('/logout', authenticate, logout)


module.exports = userRouter
