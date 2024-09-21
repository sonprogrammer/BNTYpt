const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    kakaoId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['trainer', 'member'],
        required: true
    },
})

const User = mongoose.model('User', userSchema)
 
module.exports = User