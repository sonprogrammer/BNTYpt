const multer = require('multer');

const storage = multer.memoryStorage(); // 메모리에 저장
const upload = multer({ storage });

module.exports = upload;
