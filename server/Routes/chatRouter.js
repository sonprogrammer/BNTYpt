const express = require('express');
const { createChatRoom, getChatRooms, sendMessage } = require('../Controller/chatController');
const chatRouter = express.Router();


chatRouter.post('/', createChatRoom)
chatRouter.get('/chatrooms/:userId', getChatRooms)
chatRouter.post('/send', sendMessage)

module.exports = chatRouter;