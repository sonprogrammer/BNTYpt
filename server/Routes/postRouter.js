const express = require('express');
const path = require('path');
const multer = require('multer');
const { createPost, getUserPosts, deletePosts } = require('../Controller/postController');
const { authenticate } = require('../middleware/authenticate');
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

postRouter.post('/', upload.array('images'),authenticate, createPost)
postRouter.get('/user/email/:email',authenticate, getUserPosts)
postRouter.get('/user/kakao/:kakaoId',authenticate, getUserPosts)
postRouter.delete('/delete/:photoId',authenticate, deletePosts)

module.exports = postRouter