const express = require('express');
const { createChatRoom, getChatRooms } = require('../Controller/chatController');
const chatRouter = express.Router();


chatRouter.post('/', createChatRoom)
chatRouter.get('/chatrooms/:userId', getChatRooms)

module.exports = chatRouter;