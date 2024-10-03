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
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        refpath: 'userType',
        required: true
    },
    userType: {
        type: String, 
        enum: ['regularUser', 'kakaoUser'],
        // required: true
    }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post