const jwt = require('jsonwebtoken')

const socketAuthenticate = (socket, next) => {
    try {
        const token = socket.handshake.auth?.token

        if(typeof token !== 'string' || !token){
            return next(new Error('no token provided'))
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        if(!decoded || typeof decoded !== 'object' || typeof decoded.id !== 'string'){
            return next(new Error('invalid token'))
        }

        socket.data.user = decoded
        return next()
    } catch (error) {
        return next(new Error(error.name === 'TokenExpiredError' ? 'token expired' : 'invalide token'))
    }
}

module.exports = { socketAuthenticate }