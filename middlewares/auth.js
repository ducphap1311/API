const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(400).json({msg: "No valid token provided"})
    }
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, userName} = decoded
        req.user = {id, userName}
        next()
    } catch (error) {
        return res.status(400).json({msg: "Invalid token"})
    }
}

module.exports = authenticateUser