const Post = require("../Models/postModel");
const regularUser = require("../Models/regularUserModel");
const kakaoUser = require("../Models/kakaoUserModel");
const mongoose = require("mongoose")

const createPost = async (req, res) => {
  const { text, images } = req.body;
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ message: "login required", success: false });
  }
  try {
    let user = await regularUser.findById(userId);
    if (!user) {
      user = await kakaoUser.findById(userId);
    }
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const newPost = new Post({
      text,
      images,
      userId: user._id,
      createdAt: new Date(),
    });

    await newPost.save();
    res.status(200).json({ success: true, post: newPost });
  } catch (error) {
    console.log("error in createPost", error);
    res.status(500).json({ success: false, message: "fdsafsda" });
  }
};

const getUserPosts = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "login required", success: false });
  }
  try {
    const posts = await Post.find({ userId });

    return res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Error in getUserPosts:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deletePosts = async (req, res) => {
  const { photoId } = req.params;
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "login required", success: false });
  }
  if (!mongoose.isValidObjectId(photoId)) {
    return res.status(400).json({
      success: false,
      message: "유효하지 않은 게시물 ID입니다.",
    });
  }

  try {
    const photo = await Post.findOneAndDelete({
      _id: photoId,
      userId,
    });
    if (!photo) {
      return res
        .status(404)
        .json({ success: false, message: "there is no photo" });
    }

    return res.status(200).json({ success: true, message: "success" })
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server erorr" });
  }
};

module.exports = { createPost, getUserPosts, deletePosts };
