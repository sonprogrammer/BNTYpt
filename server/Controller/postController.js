const Post = require('../Models/postModel')

const createPost = async (req, res) => {
    try {
        const { text } = req.body
        const images = req.files.map(file => file.path)

        const newPost = new Post({
            text,
            images
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