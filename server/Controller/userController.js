// userController.js
const axios = require('axios');
const User = require('../Models/userModel'); 
const { resolve } = require('path/win32');

const loginUser = async (req, res) => {
    const { accessToken, role } = req.body;
    
    try {
        const userInfoRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const userInfo = userInfoRes.data;
        const  kakaoId = userInfo.id


        let user = await User.findOne({ kakaoId, role}) 
        
        if(!user){
            user = new User({
                kakaoId,
                name: userInfo.properties.nickname,
                role
            })
            await user.save()
        }

        res.status(200).json({ 
            success: true, 
            message: 'login successful', 
            kakaoId: user.kakaoId, 
            name: user.name, 
            role: user.role
         })
    } catch (error) {
        console.error('error verifying access token', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getUser = async (req, res, next) => {
    const { kakaoId } = req.query
    try {
        let user = await User.findOne({ kakaoId }) 
        res.status(200).json(user);
    } catch (error) {
        next('error', error)
    }
}

module.exports = { loginUser, getUser };
