const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const header = req.headers.authorization

    if(!header) return res.status(401).json({message: 'no token provided'})

    const token = header.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({message: 'invalid token'})
            // console.log('jwt ok:', decoded);
        req.user = decoded
        next()
    })
}

module.exports = { authenticate}