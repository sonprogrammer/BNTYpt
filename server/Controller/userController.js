// userController.js
const axios = require("axios");
const regularUser = require("../Models/regularUserModel");
const kakaoUser = require("../Models/kakaoUserModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

//*유저정보다시 가져오기
const getMe = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "login required", success: false });
  }

  try {
    const user =
      (await regularUser.findById(userId)) ||
      (await kakaoUser.findById(userId));

    if (!user) {
      return res.status(404).json({ message: "no user found", success: false });
    }

    return res.status(200).json({
      success: true,
      user: {
        objectId: user._id,
        email: user.email,
        kakaoId: user.kakaoId,
        name: user.name,
        role: user.role,
        ptCount: user.ptCount,
      },
    });
  } catch (error) {
    console.error("getMe", error);
    return res.status(500).json({
      success: false,
      message: "회원 정보 조회에 실패했습니다.",
    });
  }
};

//*일반 로그인
const loginRegularUser = async (req, res) => {
  const { role, email, password } = req.body;
  console.log('role', role,email)

  try {
    const user = await regularUser.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    if (!role) {
      return res
        .status(400)
        .json({ success: false, message: "Role must be selected" });
    }

    if (role !== user.role) {
      return res
        .status(400)
        .json({ success: false, message: "Role을 다시 확인해주세요!" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "1h" },
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("bntyRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "login successfully",
      user: {
        objectId: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        token: token,
        ptCount: user.ptCount,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "internal server errro" });
  }
};

//* 카카오톡 로그인
const loginKakaoUser = async (req, res) => {
  const { code, selectedRole } = req.body;

  console.log("code", code, selectedRole);

  if (selectedRole !== "member" && selectedRole !== "trainer") {
    return res
      .status(400)
      .json({ message: "please check your role type", success: false });
  }

  if (typeof code !== "string" || !code.trim()) {
    return res
      .status(400)
      .json({ message: "인가 코드가 필요합니다.", success: false });
  }

  try {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_REST_API_KEY,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code,
    });

    const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: params,
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.access_token) {
      return res.status(400).json({ message: "failed to issue kakao token" });
    }
    const kakaoaccessToken = tokenData.access_token;
    const userInfoRes = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${kakaoaccessToken}`,
      },
    });

    const userInfo = userInfoRes.data;
    const kakaoId = userInfo.id;

    let user = await kakaoUser.findOne({ kakaoId, role: selectedRole });

    if (!user) {
      user = new kakaoUser({
        kakaoId,
        name: userInfo.properties.nickname,
        role: selectedRole,
      });
      await user.save();
    }

    const token = jwt.sign(
      {
        id: user._id,
        kakaoId: user.kakaoId,
        role: user.role,
        name: user.name,
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "1h" },
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("bntyRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "login successful",
      user: {
        objectId: user._id,
        kakaoId: user.kakaoId,
        name: user.name,
        role: user.role,
        ptCount: user.ptCount,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server errro" });
  }
};

const checkEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await regularUser.findOne({ email });

    if (user) {
      return res.status(200).json({ exists: true });
    }
    return res.status(200).json({ exists: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const signupUser = async (req, res, next) => {
  const { email, password, role, name } = req.body;
  try {
    const existingUser = await regularUser.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "이미 사용중인 이메일 입니다." });
    }

    let hashedPassword = await bcryptjs.hash(password, 10);

    await regularUser.create({
      email,
      password: hashedPassword,
      role,
      name,
    });
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res.clearCookie("bntyRefreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
  res.status(200).json({ success: true, message: "logout success" });
};

module.exports = {
  getMe,
  signupUser,
  checkEmail,
  loginRegularUser,
  loginKakaoUser,
  logout,
};
