// userController.js
const axios = require('axios');
const regularUser = require('../Models/regularUserModel') 
const kakaoUser = require('../Models/kakaoUserModel'); 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');



//*일반 로그인
const loginRegularUser = async (req, res) => {
    const { email, password} = req.body;

    try {
        const user = await regularUser.findOne({ email})
        if(!user){
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res. status(400).json({ success: false, message: 'invalid password' });
        }
        return res.status(200).json({
            success: true,
            message: 'login successfully',
            email: user.email,
            name: user.name,
            role: user.role
        })
    } catch (error) {
        console.error(error)
        res.status(5000).json({ success: false, message: 'internal server errro'})
    }
}


//* 카카오톡 로그인
const loginKakaoUser = async (req, res) => {
    const { kakaoId, role, email } = req.body

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
        
    }
}

// const loginUser = async (req, res) => {
//     const { accessToken, role, email, password } = req.body;
    
//     try {
//         if(accessToken ){
//             const userInfoRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             });
            
//             const userInfo = userInfoRes.data;
//             const  kakaoId = userInfo.id
            
            
//             let user = await User.findOne({ kakaoId, role}) 
            
//             if(!user){
//                 user = new User({
//                     kakaoId,
//                     name: userInfo.properties.nickname,
//                     role
//                 })
//                 await user.save()
//             }
            
//             res.status(200).json({ 
//                 success: true, 
//                 message: 'login successful', 
//                 kakaoId: user.kakaoId, 
//                 name: user.name, 
//                 role: user.role
//             })
//         }  else if (email && password) {
//             // 일반 로그인 처리
//             if(!email || !password) {
//                 return res.status(400).json({ success: false, message: 'email and password are required' })
//             }
//             const user = await User.findOne({ email });
//             if (!user) {
//                 return res.status(401).json({ success: false, message: 'Invalid email or password' });
//             }

//             // 비밀번호 확인
//             const isPasswordValid = await bcrypt.compare(password, user.password);
//             if (!isPasswordValid) {
//                 return res.status(401).json({ success: false, message: 'Invalid email or password' });
//             }

//             const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET, {expiresIn : '1h'})

//             // 로그인 성공
//             return res.status(200).json({
//                 success: true,
//                 message: 'Login successful',
//                 email: user.email,
//                 role: user.role,
//                 token
//             });
//         } else {
//             return res.status(400).json({ success: false, message: 'Access token or email/password required' });
//         }
//     } catch (error) {
//         console.error('error verifying access token', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };

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
            // kakaoId: null
        })

        await newUser.save()
        res.status(200).json({success: true, message: 'success to signup'})
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message:'internal server error'})
    }
}

module.exports = { getUser, signupUser, checkEmail, loginRegularUser, loginKakaoUser };
