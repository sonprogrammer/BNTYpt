const ChatRoom = require("../Models/chatModel");
const kakaoUser = require("../Models/kakaoUserModel");
const regularUser = require("../Models/regularUserModel");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");

const findMember = async (memberId) => {
  return (
    (await regularUser.findById(memberId)) ||
    (await kakaoUser.findById(memberId))
  );
};

const createChatRoom = async (req, res) => {
  const { trainerId } = req.body;
  const memberId = req.user?.id;
  if (!memberId) {
    return res.status(401).json({ success: false, message: "login required" });
  }
  if (req.user.role !== "member") {
    return res.status(403).json({
      success: false,
      message: "회원만 QR 체크인을 할 수 있습니다.",
    });
  }
  if (typeof trainerId !== "string" || !mongoose.isValidObjectId(trainerId)) {
    return res.status(400).json({
      success: false,
      message: "유효하지 않은 트레이너 QR코드입니다.",
    });
  }
  try {
    const trainer =
      (await kakaoUser.findById(trainerId)) ||
      (await regularUser.findById(trainerId));
    const member =
      (await kakaoUser.findById(memberId)) ||
      (await regularUser.findById(memberId));

    if (!member || member.role !== "member") {
      return res.status(403).json({
        success: false,
        message: "회원 정보를 확인할 수 없습니다.",
      });
    }
    if (!trainer || trainer.role !== "trainer") {
      return res.status(404).json({
        success: false,
        message: "트레이너를 찾을 수 없습니다.",
      });
    }
    const existingRoom = await ChatRoom.findOne({ trainerId, memberId });

    if (existingRoom) {
      return res.status(200).json({
        success: true,
        newlyConnected: false,
        message: "이미 연결된 트레이너입니다.",
      });
    }

    const chatRoom = new ChatRoom({
      trainerId: trainer._id,
      trainerName: trainer.name,
      memberId: member._id,
      memberName: member.name,
      messages: [],
    });

    await chatRoom.save();
    return res
      .status(201)
      .json({ success: true, message: "트레이너 연결 완료", newlyConnected: true });
  } catch (error) {
    console.error("createChatRoom", error);
    return res.status(500).json({
      success: false,
      message: "채팅방 연결에 실패했습니다.",
    });
  }
};

const getChatRooms = async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: "login required" });
  }

  try {
    const user =
      (await kakaoUser.findById(userId)) ||
      (await regularUser.findById(userId));

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "not found user" });
    }
    const chatRooms = await ChatRoom.find({
      $or: [{ trainerId: user._id }, { memberId: user._id }],
    });

    if (chatRooms.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "no chatting room" });
    }

    const roomsWithNames = await Promise.all(
      chatRooms.map(async (room) => {
        let opponentName;

        if (room.trainerId.toString() === user._id.toString()) {
          const member =
            (await kakaoUser.findById(room.memberId)) ||
            (await regularUser.findById(room.memberId));
          opponentName = member ? member.name : "Unknown Member";
        } else {
          const trainer =
            (await kakaoUser.findById(room.trainerId)) ||
            (await regularUser.findById(room.trainerId));
          opponentName = trainer ? trainer.name : "Unknown Trainer";
        }

        return {
          ...room._doc,
          opponentName,
        };
      }),
    );
    res.status(200).json({
      success: true,
      userName: user.name,
      chatRooms: roomsWithNames,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "erroㅇr" });
  }
};

const getMessages = async (req, res) => {
  const { chatRoomId } = req.params;
  const userId = req.user.id.toString();
  try {
    const chatRoom = await ChatRoom.findById(chatRoomId);
    if (!chatRoom) {
      return res
        .status(404)
        .json({ success: false, message: "chat room not found" });
    }
    if (!chatRoom.messages || chatRoom.messages.length === 0) {
      return res.status(200).json({ success: true, messages: [] });
    }

    const isParticipant =
      String(chatRoom.trainerId) === userId ||
      String(chatRoom.memberId) === userId;

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: "dont have authorization",
      });
    }
    const messages = (chatRoom.messages ?? []).map((msg) => ({
      ...msg.toObject(),
      isMine: String(msg.sender) === userId,
    }));
    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: "server error" });
  }
};

const uploadFile = async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ message: "login required", success: false });
  }

  try {
    if (!req.file)
      return res.status(400).json({ success: false, message: "not found" });

    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ success: false, message: "upload failed" });
        }
        return res.status(200).json({ success: true, url: result.secure_url });
      })
      .end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ success: false, message: "internal sever eeorr" });
  }
};

const sendMessage = async (req, res) => {
  const { chatRoomId, message, type, data } = req.body;
  const userId = req.user.id;
  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: "credentail required" });
  }

  try {
    const chatRoom = await ChatRoom.findById(chatRoomId);

    if (!chatRoom) {
      return res
        .status(404)
        .json({ success: false, message: "can not find chattingroom" });
    }

    const isParticipant =
      String(chatRoom.memberId) === String(userId) ||
      String(chatRoom.trainerId) === String(userId);

    if (!isParticipant) {
      return res
        .status(403)
        .json({ success: false, message: "there is no authorization" });
    }

    const newMessage = {
      sender: userId,
      type: type || "text",
      message: message || null,
      data: data || null,
      readBy: [userId],
      timestamp: new Date(),
    };

    chatRoom.messages.push(newMessage);
    await chatRoom.save();

    const savedMessage = chatRoom.messages[chatRoom.messages.length - 1];

    res.status(200).json({ success: true, message: savedMessage });
  } catch (error) {
    res.status(500).json({ message: "errror" });
  }
};

const addPtCount = async (req, res) => {
  const trainerId = req.user?.id;
  const { memberId, ptCount } = req.body;

  if (!trainerId) {
    return res.status(401).json({ message: "login required", success: false });
  }
  if (req.user.role !== "trainer") {
    return res
      .status(403)
      .json({ success: false, message: "트레이너만 추가할 수 있습니다." });
  }
  if (typeof memberId !== "string" || !mongoose.isValidObjectId(memberId)) {
    return res
      .status(400)
      .json({ success: false, message: "유효하지 않은 회원 ID입니다." });
  }
  if (!Number.isSafeInteger(ptCount) || ptCount <= 0) {
    return res
      .status(400)
      .json({ success: false, message: "추가 횟수는 양의 정수여야 합니다." });
  }

  try {
    const relationship = await ChatRoom.exists({ trainerId, memberId });

    if (!relationship) {
      return res
        .status(403)
        .json({ success: false, message: "연결된 트레이너가 아닙니다." });
    }
    const member = await findMember(memberId);
    if (!member || member.role !== "member") {
      return res
        .status(404)
        .json({ success: false, message: "회원을 찾을 수 없습니다." });
    }
    const updatedMember = await member.constructor.findOneAndUpdate(
      { _id: memberId, role: "member" },
      { $inc: { ptCount } },
      { new: true },
    );
    if (!updatedMember) {
      return res
        .status(404)
        .json({ success: false, message: "회원을 찾을 수 없습니다." });
    }
    return res
      .status(200)
      .json({ success: true, ptCount: updatedMember.ptCount });
  } catch (error) {
    console.error("addPtCount", error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

const subtractPtCount = async (req, res) => {
  const memberId = req.user?.id;
  const { trainerId } = req.body;
  if (!memberId) {
    return res.status(401).json({ success: false, message: "login required" });
  }
  if (req.user.role !== "member") {
    return res
      .status(403)
      .json({ success: false, message: "회원만 체크인할 수 있습니다." });
  }
  if (typeof trainerId !== "string" || !mongoose.isValidObjectId(trainerId)) {
    return res
      .status(400)
      .json({ success: false, message: "유효하지 않은 트레이너 ID입니다." });
  }
  try {
    const relationship = await ChatRoom.exists({ trainerId, memberId });
    if (!relationship) {
      return res
        .status(403)
        .json({ success: false, message: "연결된 트레이너가 아닙니다." });
    }
    const member = await findMember(memberId);
    if (!member || member.role !== "member") {
      return res
        .status(404)
        .json({ success: false, message: "회원을 찾을 수 없습니다." });
    }
    const updatedMember = await member.constructor.findOneAndUpdate(
      { _id: memberId, role: "member", ptCount: { $gte: 1 } },
      { $inc: { ptCount: -1 } },
      { new: true },
    );
    if (!updatedMember) {
      return res.status(409).json({
        success: false,
        message: "수업일수가 끝났습니다.",
      });
    }
    return res
      .status(200)
      .json({ success: true, ptCount: updatedMember.ptCount });
  } catch (error) {
    console.error("subtractPtCount", error);
    return res
      .status(500)
      .json({ success: false, message: "internalv sever erro" });
  }
};

const getPtCount = async (req, res) => {
  const { memberId } = req.params;
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "login required", success: false });
  }

  try {
    const [regularUserData, kakaoUserData] = await Promise.all([
      regularUser.findOne({ _id: memberId }),
      kakaoUser.findOne({ _id: memberId }),
    ]);

    const user = regularUserData || kakaoUserData;

    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    res.status(200).json({ success: true, data: user.ptCount });
  } catch (error) {
    console.log("error", error);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ success: false, message: "Interndal Server Error" });
    }
  }
};

module.exports = {
  createChatRoom,
  getChatRooms,
  sendMessage,
  getMessages,
  addPtCount,
  subtractPtCount,
  getPtCount,
  uploadFile,
};
