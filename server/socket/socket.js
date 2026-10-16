const mongoose = require("mongoose");

const ChatRoom = require("../Models/chatModel");
const kakaoUser = require("../Models/kakaoUserModel");
const regularUser = require("../Models/regularUserModel");

const findMyRoom = async (chatRoomId, userId) => {
  if (typeof chatRoomId !== "string" || !mongoose.isValidObjectId(chatRoomId)) {
    return null;
  }
  return ChatRoom.findOne({
    _id: chatRoomId,
    $or: [{ memberId: userId }, { trainerId: userId }],
  });
};

const chatSocket = (io) => {
  io.on("connection", (socket) => {
    const userId = String(socket.data.user.id);
    socket.on("getChatRooms", async () => {
      try {
        const rooms = await ChatRoom.find({
          $or: [{ memberId: userId }, { trainerId: userId }],
        }).lean();

        const roomsWithNames = await Promise.all(
          rooms.map(async (room) => {
            const isTrainer = String(room.trainerId) === userId;
            const opponentId = isTrainer ? room.memberId : room.trainerId;
            const opponent =
              (await kakaoUser.findById(opponentId)) ||
              (await regularUser.findById(opponentId));

            const opponentName = opponent
              ? opponent.name
              : isTrainer
                ? "unknown member"
                : "unknown trinaer";

            const lastMsg = room.messages?.[room.messages.length - 1];
            const isUnread =
              lastMsg &&
              String(lastMsg.sender) !== userId &&
              !lastMsg.readBy?.some((id) => String(id) === userId);

            return {
              ...room,
              opponentName,
              lastMessage: lastMsg?.message || null,
              unRead: !!isUnread,
            };
          }),
        );
        socket.emit("chatRoomsUpdate", roomsWithNames);
      } catch (error) {
        console.error(error);
        socket.emit("chatError", { message: "채팅방 조회 실패" });
      }
    });

    socket.on("joinRoom", async (chatRoomId) => {
      try {
        const room = await findMyRoom(chatRoomId, userId);

        if (!room) {
          return socket.emit("chatError", {
            message: "접근할 수 없는 채팅방입니다.",
          });
        }
        await socket.join(String(room._id));
      } catch (error) {
        console.error(error);
        socket.emit("chatError", { message: "채팅방 입장에 실패했습니다." });
      }
    });

    socket.on("leaveRoom", (chatRoomId) => {
      if (typeof chatRoomId !== "string") return;
      socket.leave(chatRoomId);
    });

    socket.on("sendMessage", async (message) => {
      try {
        const room = await findMyRoom(message.chatRoomId, userId);

        if (!room) {
          return socket.emit("chatError", {
            message: "접근할 수 없는 채팅방입니다",
          });
        }

        const payload = {
          text: message.text,
          sender: userId,
          type: message.type,
          data: message.data,
          readBy: [userId],
          chatRoomId: String(room._id),
          timestamp: message.timestamp,
        };
        socket.to(String(room._id)).emit("receiveMessage", payload);
      } catch (error) {
        console.error(error);
        socket.emit("chatError", { message: "메시지 전송 실패" });
      }
    });

    socket.on("read", async (payload = {}) => {
      try {
        const { chatRoomId } = payload;
        const room = await findMyRoom(chatRoomId, userId);

        if (!room) {
          return socket.emit("chatError", {
            message: "접근할 수 없는 채팅방입니다",
          });
        }

        await ChatRoom.updateOne(
          {
            _id: room._id,
            $or: [{ memberId: userId }, { trainerId: userId }],
          },
          { $addToSet: { "messages.$[].readBy": userId } },
        );

        socket
          .to(String(room._id))
          .emit("read", { chatRoomId: String(room._id), userId });
      } catch (error) {
        console.error(error);
        socket.emit("chatError", { message: "읽음 처리에 실패했습니다." });
      }
    });

    socket.on("disconnect", () => {
      console.error("disconnected", socket.id);
    });
  });
};

module.exports = { chatSocket };
