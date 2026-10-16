const express = require("express");
const {
  createChatRoom,
  getChatRooms,
  sendMessage,
  getMessages,
  subtractPtCount,
  addPtCount,
  getPtCount,
  uploadFile,
} = require("../Controller/chatController");
const chatRouter = express.Router();
const upload = require("../utils/upload");
const { authenticate } = require("../middleware/authenticate");

chatRouter.post("/", authenticate, createChatRoom);
chatRouter.get("/chatrooms", authenticate, getChatRooms);
chatRouter.post("/send", authenticate, sendMessage);
chatRouter.post("/upload", upload.single("file"), authenticate, uploadFile);
chatRouter.get("/messages/:chatRoomId", authenticate, getMessages);
chatRouter.post("/pt/add", authenticate, addPtCount);
chatRouter.post("/pt/check-in", authenticate, subtractPtCount);
chatRouter.get("/pt/:memberId", authenticate, getPtCount);

module.exports = chatRouter;
