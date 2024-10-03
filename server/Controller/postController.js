const Post = require('../Models/postModel')
const regularUser = require('../Models/regularUserModel')
const cloudinary = require('cloudinary')
const kakaoUser = require('../Models/kakaoUserModel')

const createPost = async (req, res) => {
    try {
        const { text, email } = req.body
        console.log('req.user', req.user)
        let images = []

        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const result = await cloudinary.uploader.upload(file.path); // Cloudinary에 업로드
                images.push(result.secure_url); // 업로드된 이미지의 URL을 배열에 추가
            }
            console.log('Uploaded images:', images);
        }


        const user = await regularUser.findOne({ email: req.user.email }); 


        const newPost = new Post({
            text,
            images,
            userId : email,
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
        const posts = await Post.find().populate('userId', 'name role')
        res.status(200).json({ success: true, posts })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getUserPosts = async (req, res) => {
    try {
        const { email } = req.params
        const user = await regularUser.findOne({ email }) || kakaoUser.findOne({ email })
        console.log('req.user', req.user)

        if(!user){
            return res.status(404).json({ success: false, message: 'user not found' })
        }
        
        const posts = await Post.findOne({ userId: user._id }).populate('userId', 'name role')
        res.status(200).json({ success: true, posts})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { createPost, getPost, getUserPosts}