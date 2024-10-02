// userController.js
const axios = require('axios');
const regularUser = require('../Models/regularUserModel') 
const kakaoUser = require('../Models/kakaoUserModel'); 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');



//*일반 로그인
const loginRegularUser = async (req, res) => {
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
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res. status(400).json({ success: false, message: 'invalid password' });
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name
        }, process.env.JWT_SECRET, { expiresIn: '24h' });
        
        return res.status(200).json({
            success: true,
            message: 'login successfully',
            user: {
                email: user.email,
                name: user.name,
                role: user.role,
                token: token
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
        
        res.status(200).json({ 
            success: true, 
            message: 'login successful', 
            kakaoId: user.kakaoId, 
            name: user.name, 
            role: user.role
        })
    } catch (error) {
        
    }
}

const getUser = async (req, res, next) => {
    const { kakaoId } = req.query
    try {
        let user = await User.findOne({ kakaoId }) 
        res.status(200).json(user);
    } catch (error) {
        next('error', error)
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


const signupUser = async(req, res) => {
    const { email, password, role, name} = req.body;

    try {
        const user = await regularUser.findOne({ email})
        if(user){
            return res.status(400).json({ success: false, message: 'email already exists' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new regularUser({
            email,
            password: hashedPassword,
            role,
            name
        })

        await newUser.save()

        const token = jwt.sign({
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
            name: newUser.name
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h'}
    )
        
        res.status(200).json({success: true, message: 'success to signup', token: token})
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message:'internal server error'})
    }
}

module.exports = { getUser, signupUser, checkEmail, loginRegularUser, loginKakaoUser };
