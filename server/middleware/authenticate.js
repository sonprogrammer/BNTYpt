const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const header = req.headers.authorization;

    console.log('인증 요청:', req.originalUrl)
  console.log('Authorization 존재:', !!header)
  if (!header) return res.status(401).json({ message: "no token provided" });
  const token = header.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message:
          err.name === "TokenExpiredError" ? "token expired" : "invalid token",
      });
    }
    console.log('남은 토큰 유효시간:', decoded.exp - Math.floor(Date.now() / 1000), '초')

    req.user = decoded;
    next();
  });
};

module.exports = { authenticate };
