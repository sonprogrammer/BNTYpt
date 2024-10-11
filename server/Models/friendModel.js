const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'regularUser'
    },
    kakaoUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'kakaoUser'
    },
    friendId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'friendType'
    },
    friendType: {
        type: String,
        enum: ['regularUser', 'kakaoUser'],
        required: true
    }
},  {timestamps: true})

const Friend = mongoose.model('Friend', friendSchema);
module.exports = Friend