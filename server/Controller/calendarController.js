const Calendar = require("../Models/calendarModel");
const regularUser = require("../Models/regularUserModel");
const kakaoUser = require("../Models/kakaoUserModel");

const createPost = async (req, res) => {
  const { date, workout, diet } = req.body;
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ message: "login required", success: false });
  }
  try {
    const newPost = new Calendar({
      date,
      workout,
      diet,
      userId
    });

    await newPost.save();
    res.status(200).json({
      success: true,
      message: "Success",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

const getUserCalendar = async (req, res) => {
  const { email, kakaoId } = req.params;
  const userId = req.user.id;
  try {
    const calendars = await Calendar.find({ userId });

    if (!calendars) {
      return res
        .status(404)
        .json({ success: false, message: "there is no calendar data" });
    }
    return res.status(200).json({ success: true, calendars });
  } catch (error) {
    console.error("error", error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

module.exports = {
  createPost,
  getUserCalendar,
};
