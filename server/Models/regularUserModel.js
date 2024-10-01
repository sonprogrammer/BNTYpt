const mongoose = require('mongoose');

const regularUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const regularUser = mongoose.model('regularUser', regularUserSchema)
module.exports = regularUser