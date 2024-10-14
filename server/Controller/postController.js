const Post = require('../Models/postModel')
const regularUser = require('../Models/regularUserModel')
const kakaoUser = require('../Models/kakaoUserModel')
const cloudinary = require('cloudinary')

const createPost = async (req, res) => {
    try {
        const { text, email, kakaoId, images } = req.body
       console.log(text)

        let user

        if(email){
            user = await regularUser.findOne({ email })
            if(!user){
                return res.status(404).json({ success: false, message: 'user not found' })
            }
        }

        if(kakaoId){
            user = await kakaoUser.findOne({ kakaoId })
            if(!user){
                return res.status(404).json({ success: false, message: 'user not found' })
            }
        }

        if(!user){
            return res.status(404).json({ success: false, message: 'user not found'})
        }


    

        const newPost = new Post({
            text,
            images,
            userId : user._id,
            createdAt: new Date()
        })

        await newPost.save()
        res.status(200).json({ success: true, post: newPost })
        
    } catch (error) {
        console.log('error in createPost', error)
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
        const { email, kakaoId } = req.params
        


        let user
        if(email){
            user = await regularUser.findOne({ email})
        }else if(kakaoId){
            user = await kakaoUser.findOne({ kakaoId })
        }
        

        if(!user){
            return res.status(404).json({ success: false, message: 'user not found' })
        }
        
        const posts = await Post.find({ userId: user._id }).populate('userId', 'name role')
        if (!posts || posts.length === 0) {
            return res.status(404).json({ success: false, message: 'No posts found for this user' });
        }

        res.status(200).json({ success: true, posts})
    } catch (error) {
        console.error('Error in getUserPosts:', error); 
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = { createPost, getPost, getUserPosts}