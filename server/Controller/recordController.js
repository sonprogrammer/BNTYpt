const regularUser = require('../Models/regularUserModel')
const kakaoUser = require('../Models/kakaoUserModel')
const Record = require('../Models/recordModel')

const createRecord = async(req, res) => {
    try {
        const { text,title, userObjectId, images, opponentName } = req.body
        let user = await regularUser.findById(userObjectId);
        if (!user) {
            user = await kakaoUser.findById(userObjectId);
        }

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    

        const newRecord = new Record({
            text,
            title,
            images,
            trainerId : user._id,
            uploadTime: new Date().toISOString(),
            memberId: opponentName,
        })

        await newRecord.save()
        res.status(200).json({ success: true, record: newRecord })
        
    } catch (error) {
        console.log('error in createPost', error)
        res.status(500).json({ success: false, message: error.message })
    }
}

//*trainer가 작성한 모든 게시글  -> 자신이 작성한 모든 포스트를 보는것
const getRecordsByT = async(req, res) => {
    const { userObjectId } = req.params
    try {
        const records = await Record.find({ trainerId: userObjectId})
        return res.status(200).json({ success: true, records })
    } catch (error) {
        return res.status(500).json({ error: error})
    }
}

//*trainer가 작성한 모든 게시글 - > 트레이너가 각 멤버에대해 작성해준 포스트를 자신것만 보는것
const getMemberRecords = async(req, res) => {
    const { memberId } = req.params
    const { trainerId } = req.query
    console.log('user', memberId, trainerId)

    try {
        let records
        if(trainerId){
            records = await Record.find({memberId, trainerId})    
            
        }else{
            records = await Record.find({ memberId})
        }

        return res.status(200).json({ success: true, records })
    } catch (error) {
        return res.status(500).json({ error: error})
    }
}

// *트레이너가 노트내용을 삭제
const deleteMemberRecords = async(req, res) => {
    const { noteId } = req.params

    try {
        const note = await Record.findOne({_id: noteId})
        if(!note){
            return res.status(404).json({success: false, message: 'not found'})
        }

        await Record.findByIdAndDelete(noteId)

        return res.status(200).json({success: true, message: 'success'})
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, message: 'failed'})
    }
}

// *트레이너가 노트내용 수정
const editMemberRecords = async(req, res) => {
    const { noteId } = req.params
    const { title, text} = req.body

    try {
        const note = await Record.findOne({_id: noteId})
        if(!note){
            return res.status(404).json({success: false, message: 'not found'})
        }

        note.title = title ?? note.title
        note.text = text ?? note.text
        await note.save()

        return res.status(200).json({success: true, message: 'success', note})
    } catch (error) {
        console.error(error)
        return res.status(500).json({success: false, message: 'sever eror'})
    }
}


module.exports = { createRecord, getRecordsByT, getMemberRecords,deleteMemberRecords, editMemberRecords }