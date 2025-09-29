const express = require('express');
const { createChatRoom, getChatRooms, sendMessage, getMessages, setPtCount, getPtCount, uploadFile } = require('../Controller/chatController');
const chatRouter = express.Router();
const upload = require('../utils/upload')

chatRouter.post('/', createChatRoom)
chatRouter.get('/chatrooms/:userId', getChatRooms)
chatRouter.post('/send', sendMessage)
chatRouter.post('/upload', upload.single('file'), uploadFile)
chatRouter.get('/messages/:chatRoomId', getMessages)
chatRouter.post('/pt', setPtCount)
chatRouter.get('/pt/:memberId', getPtCount)

module.exports = chatRouter;