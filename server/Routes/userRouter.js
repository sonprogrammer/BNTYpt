const express = require('express');
const { loginUser, getUser } = require('../Controller/userController')
const userRouter = express.Router();


userRouter.post('/login', loginUser)
userRouter.get('/profile', getUser)

module.exports = userRouter
