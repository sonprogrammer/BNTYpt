const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    kakaoId: {
        type: String,
        sparse: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    role:{
        type: String,
        enum: ['trainer', 'member'],
        required: true
    },
},{timestamps: true})

const User = mongoose.model('User', userSchema)
 
module.exports = User