const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    trainerId: {
        type: String,
        required: true
    },
    trainerName:{
        type: String,
        required: true
    },
    memberId:{
        type: String,
        required: true
    },
    memberName: {
        type: String,
        required: true
    },
    messages: [{
        sender: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true})

const ChatRoom = mongoose.model('ChatRoom', chatSchema)
module.exports = ChatRoom