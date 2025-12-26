const Calendar = require('../Models/calendarModel')
const regularUser = require('../Models/regularUserModel');
const kakaoUser = require('../Models/kakaoUserModel');

const createPost = async (req, res) => {
    const {
        date,
        workout,
        diet,
        email,
        kakaoId
    } = req.body

    try {
        let user
        let type
        if(email){
            user = await regularUser.findOne( { email})
            type='regularUser'
            if(!user){
                return res.status(404).json({ success: false, message: 'user not found'})
            }
        }

        if(kakaoId){
            user = await kakaoUser.findOne( { kakaoId })
            type='kakaoUser'
            if(!user){
                return res.status(404).json({ success: false, message: 'user not found'})
            }
        }
        
        if(!user){
            return res.status(404).json({ success: false, message: 'user not found'})
        }
        
        const newPost = new Calendar({
            date,
            workout,
            diet,
            userId : user._id,
            userType: type
        })
 
        await newPost.save()
        res.status(200).json({
            success: true,
            message: 'Success',
            post: newPost
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error'
        })
    }
}


const getUserCalendar = async(req, res) => {
    const { email, kakaoId} = req.params
    try {
        let user
        if(email) {
            user = await regularUser.findOne({ email })
            if (!user) {
                user = await kakaoUser.findOne({ email });
            }
        } else if (kakaoId) {
            user = await kakaoUser.findOne({ kakaoId });
        }

        if(!user){
            return res.status(404).json({ success: false, message: 'user not found'})
        }

        const calendars = await Calendar.find({ userId: user._id})
        return res.status(200).json({ success: true, calendars })
    } catch (error) {
        console.error('error', error)
    }
}

module.exports = {
    createPost,
    getUserCalendar
}