// userController.js
const axios = require('axios');
const User = require('../Models/userModel'); 
const { resolve } = require('path/win32');

const loginUser = async (req, res) => {
    const { accessToken, role } = req.body;
    
    try {
        // const userInfoRes = await verifyKakaoAccessToken(accessToken);
        const userInfoRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const userInfo = userInfoRes.data;
        // const kakaoId = userInfo.id
        // const name = userInfo.properties ? userInfo.properties.nickname : 'no name';

        let user = await User.findOne({ kakaoId: userInfo.id, role: role}) 
        
        if(!user){
            user = new User({
                kakaoId: userInfo.id,
                name: userInfo.properties.nickname,
                role: role
            })
            await user.save()
        }
        
        // const user1 = await User.findOneAndUpdate(
        //     { kakaoId}, 
        //     { kakaoId, role, name }, 
        //     { upsert: true, new: true }, 
        // );

        res.status(200).json({ success: true, message: 'login successful' });
    } catch (error) {
        console.error('error verifying access token', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = { loginUser };
