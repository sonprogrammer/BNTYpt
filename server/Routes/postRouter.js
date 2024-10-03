const express = require('express');
const path = require('path');
const multer = require('multer');
const passport = require('passport');
const { createPost, getPost, getUserPosts } = require('../Controller/postController')
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

postRouter.post('/', passport.authenticate('jwt', {session: false}),upload.array('images'), createPost)
postRouter.get('/', getPost)
postRouter.get('/user/:email', getUserPosts)

module.exports = postRouter