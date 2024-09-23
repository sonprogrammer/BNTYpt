const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    text: { 
        type : String, 
        required: true
    },
    images: {
        type: [String]
    },
    date : { 
        type : Date, 
        default : Date.now()
    }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post