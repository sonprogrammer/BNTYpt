const express = require('express');
const { createChatRoom, getChatRooms, sendMessage, getMessages } = require('../Controller/chatController');
const chatRouter = express.Router();


chatRouter.post('/', createChatRoom)
chatRouter.get('/chatrooms/:userId', getChatRooms)
chatRouter.post('/send', sendMessage)
chatRouter.get('/messages/:chatRoomId', getMessages)

module.exports = chatRouter;