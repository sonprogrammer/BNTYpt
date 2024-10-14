const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    trainerId: {
        type: String,
        required: true,
      },
      memberId: {
        type: String,
        required: true,
      },
      images: {
        type: [String],  
      },
      text: {
        type: String,  
        required: true,
      },
      uploadTime: {
        type: Date, 
        default: Date.now,
      },
})

const Record = mongoose.model('Record', recordSchema)
module.exports = Record