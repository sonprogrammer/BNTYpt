const mongoose = require('mongoose')
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const userRouter = require('./Routes/userRouter');
const postRouter = require('./Routes/postRouter');
const cloudinary = require('cloudinary').v2;
const regularUser = require('./Models/regularUserModel')
const calendarRouter = require('./Routes/calendarRouter');
const chatRouter = require('./Routes/chatRouter');
const http = require('http');
const socketIo = require('socket.io');
const recordRouter = require('./Routes/recordRouter');
const ChatRoom = require('./Models/chatModel');
const kakaoUser = require('./Models/kakaoUserModel');
const cookieParser = require('cookie-parser')



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
app.set('trust proxy', 1)
app.use(cors({
    origin: ['http://localhost:3000', 'https://bnty.netlify.app'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))
app.use(cookieParser())


io.on('connection', (socket) => {


    socket.on('getChatRooms', async(userId) => {
        try {
            const rooms = await ChatRoom.find({
                $or: [{ memberId: userId }, { trainerId: userId }]
            }).lean();


            const roomsWithNames = await Promise.all(
                rooms.map(async (room) => {
                    let opponentName;
                    if (room.trainerId.toString() === userId) {
                        const member = await kakaoUser.findById(room.memberId) || await regularUser.findById(room.memberId);
                        opponentName = member ? member.name : "Unknown Member";
                    } else {
                        const trainer = await kakaoUser.findById(room.trainerId) || await regularUser.findById(room.trainerId);
                        opponentName = trainer ? trainer.name : "Unknown Trainer";
                    }

                    const lastMsg = room.messages?.[room.messages.length - 1];
                    const isUnread = lastMsg && lastMsg.sender !== userId && !lastMsg.readBy?.includes(userId);
                    return {
                        ...room,
                        opponentName,
                        lastMessage: lastMsg?.message || null,
                        unRead: !!isUnread
                    };
                })
            );

            socket.emit('chatRoomsUpdate', roomsWithNames);
        } catch (err) {
            console.error(err);
        }
    })


    
    socket.on('sendMessage', (message) => {

        const payload = {
            text: message.text,
            sender: message.sender,
            type: message.type,
            data: message.data,
            readBy: message.readBy || [],
            chatRoomId: message.chatRoomId
        }
        socket.to(message.chatRoomId).emit('receiveMessage', payload);
    });

    socket.on('joinRoom', (chatRoomId) => {
        socket.join(chatRoomId);

      });

      socket.on('read', async({chatRoomId, userId}) =>{
        try {
            const chatRoom = await ChatRoom.findById(chatRoomId)
            if(!chatRoom) return

            chatRoom.messages.forEach(msg => {
                if(!msg.readBy.includes(userId)){
                    msg.readBy.push(userId)
                }
            })
            await chatRoom.save()
            socket.to(chatRoomId).emit('read', {chatRoomId, userId})
        } catch (error) {
            console.error(err)
        }
      })
      
      
    socket.on('disconnect', () => {
        console.log('disconnected', socket.id);
    });

});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
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



const port = process.env.PORT
    

server.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);

})


app.get('/', (req, res) => {
    res.send('hdfdfdi')
})


module.exports = { io };

