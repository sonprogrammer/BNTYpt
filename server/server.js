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
const http = require('http');
const socketIo = require('socket.io');
const { Server} = require('socket.io');
const recordRouter = require('./Routes/recordRouter');



dotenv.config()

const app = express();
const server = http.createServer(app)
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}))
app.use(passport.initialize())
app.use(session({
    secret: 'secret', 
    resave: true,
    saveUninitialized: false,
}));

app.use(passport.session());

io.on('connection', (socket) => {
    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
        socket.to(message.chatRoomId).emit('receiveMessage', message);


    });
    socket.on('joinRoom', (chatRoomId) => {
        socket.join(chatRoomId);
        console.log('User joined room:', chatRoomId);
      });
    socket.on('disconnect', () => {
        console.log('disconnected', socket.id);
    });

});

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
    const user = await regularUser.findById(id);
    done(null, user);
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/user', userRouter)
app.use('/api/posts', postRouter)
app.use('/api/calendar', calendarRouter)
app.use('/api/chat', chatRouter)
app.use('/api/records', recordRouter)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('mongodb connect'))
    .catch(() => console.log('mongodb connect faild'))



const port = process.env.PORT || 40840
    

server.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);

})

app.get('/', (req, res) => {
    res.send('hdfdfdi')
})


module.exports = { io };

