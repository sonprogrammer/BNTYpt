const Post = require('../Models/postModel')
const cloudinary = require('cloudinary')

const createPost = async (req, res) => {
    try {
        const { text } = req.body
        let images = []

        if (req.files) {
            for (let file of req.files) {
                const result = await cloudinary.uploader.upload(file.path); // Cloudinary에 업로드
                images.push(result.secure_url); // 업로드된 이미지의 URL을 배열에 추가
            }
        }

        const newPost = new Post({
            text,
            images,
            createdAt: new Date()
        })

        await newPost.save()
        res.status(200).json({ success: true, post: newPost })
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getPost = async(req, res) =>{
    try {
        const posts = await Post.find()
        res.status(200).json({ success: true, posts })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { createPost, getPost}