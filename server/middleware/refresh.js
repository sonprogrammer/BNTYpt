const jwt = require('jsonwebtoken')
const regularUser = require('../Models/regularUserModel')
const kakaoUser = require('../Models/kakaoUserModel')

const refreshToken = async(req, res) => {
    try{

        const refresh = req.cookies.refreshToken
        
        
        if(!refresh){
            return res.status(401).json({message: 'no refreshtoken'})
        }
        
        jwt.verify(refresh, process.env.JWT_SECRET, async(err, decoded)=> {
            if(err){
                return res.status(403).json({message: 'invalid refreshtoken'})
            }
            
            const user = await regularUser.findById(decoded.id) || await kakaoUser.findById(decoded.id)
            if(!user){
                return res.status(404).json({message: 'user not fond'})
            }
            
            const newAccessToken = jwt.sign({
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name
            }, process.env.JWT_SECRET, {expiresIn: '1h'})

            
            return res.status(200).json({success: true, accessToken: newAccessToken})
        })
        
    }catch(error){
        console.error(error)
        return res.status(500).json({messaeg: 'interval server error'})
    }
}



module.exports = { refreshToken };