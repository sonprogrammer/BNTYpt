const express = require('express');
const path = require('path');
const multer = require('multer');
const { createPost, getUserPosts } = require('../Controller/postController')
const postRouter = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage })

postRouter.post('/', upload.array('images'), createPost)
postRouter.get('/user/email/:email', getUserPosts)
postRouter.get('/user/kakao/:kakaoId', getUserPosts)

module.exports = postRouter