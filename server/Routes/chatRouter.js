const express = require('express');
const { createChatRoom, getChatRooms, sendMessage, getMessages, setPtCount, getPtCount, uploadFile } = require('../Controller/chatController');
const chatRouter = express.Router();
const upload = require('../utils/upload');
const { authenticate } = require('../middleware/authenticate');

chatRouter.post('/',authenticate, createChatRoom)
chatRouter.get('/chatrooms/:userId',authenticate, getChatRooms)
chatRouter.post('/send',authenticate, sendMessage)
chatRouter.post('/upload', upload.single('file'),authenticate, uploadFile)
chatRouter.get('/messages/:chatRoomId',authenticate, getMessages)
chatRouter.post('/pt',authenticate, setPtCount)
chatRouter.get('/pt/:memberId',authenticate, getPtCount)

module.exports = chatRouter;