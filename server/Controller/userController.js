// userController.js
const axios = require('axios');
const regularUser = require('../Models/regularUserModel') 
const kakaoUser = require('../Models/kakaoUserModel'); 
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')



//*일반 로그인
const loginRegularUser = async (req, res, next) => {
    const { role, email, password} = req.body;

    try {
        const user = await regularUser.findOne({ email})
        if(!user){
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        if (!role) {
            return res.status(400).json({ success: false, message: 'Role must be selected' });
        }

        if(role !== user.role){
            return res.status(400).json({ success: false, message: 'Role을 다시 확인해주세요!' });
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if(!isPasswordValid){
            return res. status(400).json({ success: false, message: 'invalid password' });
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.name
        }, process.env.JWT_SECRET, { expiresIn: '24h' });

        const refreshToken = jwt.sign({
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.name
        }, process.env.JWT_SECRET, {expiresIn: '7d'})

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        
        return res.status(200).json({
            success: true,
            message: 'login successfully',
            user: {
                objectId: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                token: token,
                ptCount: user.ptCount,
                token
            }
        })
    } catch (error) {
        console.error(error) 
        res.status(500).json({ success: false, message: 'internal server errro'})
    }
}


//* 카카오톡 로그인
const loginKakaoUser = async (req, res) => {
    const { accessToken, role } = req.body

    try {
        const userInfoRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        
        const userInfo = userInfoRes.data;
        const  kakaoId = userInfo.id
        
        
        let user = await kakaoUser.findOne({ kakaoId, role}) 
        
        if(!user){
            user = new kakaoUser({
                kakaoId,
                name: userInfo.properties.nickname,
                role
            })
            await user.save()
        }

        const token = jwt.sign({
            id: user._id,
            kakaoId: user.kakaoId,
            role:user.role,
            name: user.name
        }, process.env.JWT_SECRET, {expiresIn: '24h'})

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        
        res.status(200).json({ 
            success: true, 
            message: 'login successful', 
            objectId: user._id, 
            kakaoId: user.kakaoId, 
            name: user.name, 
            role: user.role,
            ptCount: user.ptCount,
            token
        })
    } catch (error) {
        
    }
}

 
const checkEmail = async(req, res) => {
    const { email } = req.query

    try{
        const user = await regularUser.findOne({ email })

        if(user){
            return res.status(200).json({ exists: true})
        }
        return res.status(200).json({ exists: false })
    }catch(error){
        console.error(error)
        res.status(500).json({ success: false, message: 'internal server error' })
    }
}

const signupUser = async (req, res, next) => {
    const { email, password, role, name } = req.body
    try {
        let hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = await regularUser.create({
            email,
            password: hashedPassword,
            role,
            name
        })
        res.status(200).json({ success: true, user: {
            objectId: newUser._id, 
            email: newUser.email,
            name: newUser.name,
            role: newUser.role
        }});
    } catch (error) {
        next(error)
    }
}


module.exports = { signupUser, checkEmail, loginRegularUser, loginKakaoUser };
