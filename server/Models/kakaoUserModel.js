const mongoose = require('mongoose');

const kakaoUserSchema = new mongoose.Schema({
    kakaoId: {
        type: String,
        partial: true,
        unique: true
      },
      name: {
        type: String
      },
      role: {
        type: String,
        enum: [
          'trainer', 'member'
        ],
        
        required: true
      }
    }, {timestamps: true})

const kakaoUser = mongoose.model('kakaoUser', kakaoUserSchema)
module.exports = kakaoUser