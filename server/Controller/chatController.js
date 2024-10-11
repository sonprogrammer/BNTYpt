const ChatRoom = require('../Models/chatModel')
const kakaoUser = require('../Models/kakaoUserModel')
const regularUser = require('../Models/regularUserModel')

const createChatRoom = async(req, res)=> {
    const { trainerInfo, memberInfo} = req.body

    try {
        const trainer = await kakaoUser.findOne({ kakaoId: trainerInfo}) || await regularUser.findOne({ email: memberInfo})
        const member = await kakaoUser.findOne({ kakaoId: memberInfo}) || await regularUser.findOne({ email: memberInfo})

        if(!trainer || !member){
            return res.status(404).json({ success: false, message: 'not found User'})
        }

        let existChatRoom = await ChatRoom.findOne({ trainerId: trainer._id, memberId: member._id })

        if(!existChatRoom){
            const chatRoom = new ChatRoom({
                trainerId: trainer._id,
                memberId: member._id,
                message: []
            })
            await chatRoom.save()
        }
        res.status(200).json({ success: true, message: 'chatroom is created'})
    } catch (error) {
        res.status(500).json({ success: false, message: 'error'})
    }
}

const getChatRooms = async(req, res) => {
    const { userId} = req.params
    try {
        const chatRooms = await ChatRoom.find({
            $or: [{trainerId: userId}, { memberId: userId}]
        })
        res.status(200).json({ success: true, chatRooms})
    } catch (error) {
        res.status(500).json({ success: false, message: 'error'})
    }
}

module.exports = { createChatRoom, getChatRooms}