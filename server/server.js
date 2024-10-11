const mongoose = require('mongoose')
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const userRouter = require('./Routes/userRouter');
const postRouter = require('./Routes/postRouter');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const passport = require('passport');
const regularUser = require('./Models/regularUserModel')
const LocalStrategy = require('passport-local')
const session = require('express-session');
const calendarRouter = require('./Routes/calendarRouter');
const chatRouter = require('./Routes/chatRouter');


dotenv.config()

const app = express();
app.use(express.json())
app.use(cors())
app.use(passport.initialize())
app.use(session({
    secret: 'secret', 
    resave: true,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
passport.use(new LocalStrategy(
    async (email, password, done) => {
        try {
            const user = await regularUser.findOne({ email})
            if(!user){
                return done(null, false, { message: 'incorrect email'})
            }
            const isMatch = await user.comparePassword(password)
            if(!isMatch){
                return done(null, false, { message: 'incorrect password'})
            }
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }
))
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/api/friend',)
app.use('/api/user', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/calendar', calendarRouter)
app.use('/api/chat', chatRouter)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('mongodb connect'))
    .catch(() => console.log('mongodb connect faild'))

app.listen(4000, () => {
    console.log('listening on http://localhost:4000');
})

app.get('/', (req, res) => {
    res.send('hdfdfdi')
})



