const ChatRoom = require('../Models/chatModel')
const kakaoUser = require('../Models/kakaoUserModel')
const regularUser = require('../Models/regularUserModel')

const createChatRoom = async(req, res)=> {
    const { trainerInfo, memberInfo} = req.body

    try {
        const trainer = await kakaoUser.findOne({ kakaoId: trainerInfo}) || await regularUser.findOne({ email: trainerInfo})
        const member = await kakaoUser.findOne({ kakaoId: memberInfo}) || await regularUser.findOne({ email: memberInfo})

        if(!trainer || !member){
            return res.status(404).json({ success: false, message: 'not found User'})
        }
        console.log('trainer', trainer)
            console.log('member', member)

        let existChatRoom = await ChatRoom.findOne({ trainerId: trainer._id, memberId: member._id })

        if(!existChatRoom){
            const chatRoom = new ChatRoom({
                trainerId: trainer._id,
                trainerName: trainer.name,
                memberId: member._id,
                memberName: member.name,
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
    const { userId } = req.params
    try {
        const user = await kakaoUser.findOne({ kakaoId: userId }) || await regularUser.findOne({email: userId}) //현재 로그인된사용자의 정보
        if(!user){
            res.status(404).json({success: false, message: 'not found user'})
        }
        const chatRooms = await ChatRoom.find({
            $or: [{trainerId: user._id}, { memberId: user._id}]
        })

        if(chatRooms.length === 0 ){
            return res.status(200).json({success: true, message: 'no chatting room'})
        }

        console.log('chatRoom', chatRooms)

        const roomsWithNames = await Promise.all(chatRooms.map(async (room) => {
            let opponentName;

            if (room.trainerId.toString() === user._id.toString()) {
                const member = await kakaoUser.findById(room.memberId) || await regularUser.findById(room.memberId);
                opponentName = member ? member.name : 'Unknown Member';
            } else {
                const trainer = await kakaoUser.findById(room.trainerId) || await regularUser.findById(room.trainerId);
                opponentName = trainer ? trainer.name : 'Unknown Trainer';
            }

            return {
                ...room._doc,
                opponentName
            };
        }));
        
        res.status(200).json({
            success: true,
            userName: user.name,
            chatRooms: roomsWithNames})
    } catch (error) {
        res.status(500).json({ success: false, message: 'error'})
    }
}


const sendMessage = async(req, res) => {
    const { chatRoomId, sender, message} = req.body

    try {
        const chatRoom = await ChatRoom.findById(chatRoomId)
        console.log('chatRoom', chatRoom)
        console.log('chatRoomId', chatRoomId)
        if(!chatRoom){
            return res.status(404).json({ message: 'can not find chattingroom'})
        }

        chatRoom.messages.push({ sender, message})
        await chatRoom.save()
        res.status(200).json(chatRoom)
    } catch (error) {
        res.status(500).json({message: 'errror'})
    }
}

module.exports = { createChatRoom, getChatRooms, sendMessage}