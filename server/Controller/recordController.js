const regularUser = require("../Models/regularUserModel");
const kakaoUser = require("../Models/kakaoUserModel");
const Record = require("../Models/recordModel");
const mongoose = require("mongoose");

const createRecord = async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ message: "login required", success: false });
  }
  try {
    const { text, title, images, memberId } = req.body;
    let user = await regularUser.findById(userId);
    if (!user) {
      user = await kakaoUser.findById(userId);
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const newRecord = new Record({
      text,
      title,
      images,
      trainerId: user._id,
      uploadTime: new Date().toISOString(),
      memberId,
    });

    await newRecord.save();
    res.status(200).json({ success: true, record: newRecord });
  } catch (error) {
    console.log("error in createRecord", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//*trainer가 작성한 모든 게시글 - > 즉, 회원들이 보는 노트
const getMemberRecords = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "login required", success: false });
  }
  if (req.user.role !== "member") {
    return res
      .status(403)
      .json({ message: "접근 권한이 없습니다.", success: false });
  }

  try {
    const records = await Record.find({ memberId: userId });

    return res.status(200).json({ success: true, records });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const getTrainerRecords = async (req, res) => {
  const { memberId } = req.params;
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "login required", success: false });
  }
  if (req.user.role !== "trainer") {
    return res
      .status(403)
      .json({ message: "접근 권한이 없습니다.", success: false });
  }
  if (!mongoose.isValidObjectId(memberId)) {
    return res
      .status(400)
      .json({ message: "유효하지 않은 회원 ID입니다.", success: false });
  }
  try {
    const records = await Record.find({
      trainerId: userId,
      memberId,
    });

    res.status(200).json({ success: true, records });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "기록 조회에 실패했습니다.",
    });
  }
};

// *트레이너가 노트내용을 삭제
const deleteMemberRecords = async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "login required", success: false });
  }

  if (req.user.role !== "trainer") {
    return res
      .status(403)
      .json({ success: fasle, message: "you dont have a authroization" });
  }
  if (!mongoose.isValidObjectId(noteId)) {
    return res
      .status(400)
      .json({ message: "유효하지 않은 회원 ID입니다.", success: false });
  }

  try {
    const note = await Record.findOne({ _id: noteId });
    if (!note) {
      return res.status(404).json({ success: false, message: "not found" });
    }

    await Record.findByIdAndDelete(noteId);

    return res.status(200).json({ success: true, message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "failed" });
  }
};

// *트레이너가 노트내용 수정
const editMemberRecords = async (req, res) => {
  const { noteId } = req.params;
  const { title, text } = req.body;
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "login required", success: false });
  }

  if (req.user.role !== "trainer") {
    return res
      .status(403)
      .json({ success: fasle, message: "you dont have a authroization" });
  }
  if (!mongoose.isValidObjectId(noteId)) {
    return res
      .status(400)
      .json({ message: "유효하지 않은 노트 ID입니다.", success: false });
  }

  try {
    const note = await Record.findOne({ _id: noteId });
    if (!note) {
      return res.status(404).json({ success: false, message: "not found" });
    }

    note.title = title ?? note.title;
    note.text = text ?? note.text;
    await note.save();

    return res.status(200).json({ success: true, message: "success", note });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "sever eror" });
  }
};

module.exports = {
  createRecord,
  getMemberRecords,
  getTrainerRecords,
  deleteMemberRecords,
  editMemberRecords,
};
