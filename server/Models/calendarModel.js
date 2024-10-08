const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
    workout: {
        type: String,
        required: true,
    },
    diet: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'userType',
        required: true,
    },
    userType: {
        type: String,
        enum: ['regularUser', 'kakaoUser']
    }
})

const Calendar = mongoose.model('Calendar', calendarSchema)
module.exports = Calendar