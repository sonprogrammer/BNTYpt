const express = require('express');
const { createChatRoom, getChatRooms, sendMessage, getMessages, setPtCount, getPtCount } = require('../Controller/chatController');
const chatRouter = express.Router();


chatRouter.post('/', createChatRoom)
chatRouter.get('/chatrooms/:userId', getChatRooms)
chatRouter.post('/send', sendMessage)
chatRouter.get('/messages/:chatRoomId', getMessages)
chatRouter.post('/pt', setPtCount)
chatRouter.get('/pt/:memberId', getPtCount)

module.exports = chatRouter;