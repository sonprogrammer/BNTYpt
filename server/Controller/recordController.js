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
            memberId: opponentName
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
    const { userObjectId } = req.params
    console.log('user', userObjectId)
    try {
        const records = await Record.find({ memberId: userObjectId})

        return res.status(200).json({ success: true, records })
    } catch (error) {
        return res.status(500).json({ error: error})
    }
}


module.exports = { createRecord, getRecordsByT, getMemberRecords }