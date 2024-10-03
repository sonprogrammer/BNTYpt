const express = require('express');
const { getUser, checkEmail, signupUser, loginRegularUser, loginKakaoUser } = require('../Controller/userController');
const User = require('../Models/userModel');
const userRouter = express.Router();
const passport = require('passport');

userRouter.post('/login/regular', (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(400).send(info.message)
        }
        return req.logIn(user, async (loginerror) => {
            if(loginerror){
                console.error(loginerror);
                return next(loginerror);
            }
            console.log('req.isAuthenticated', req.isAuthenticated())
            console.log('req.user', req.user)
            return res.status(200).send({ success: true, user})
        })
    })(req, res, next)
})



// userRouter.post('/login/regular', loginRegularUser)
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
