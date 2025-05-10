const jwt = require("jsonwebtoken")

const signJWT = (payloadObj, expiry = '7d', secret = process.env.JWT_SECRET) => {
    return jwt.sign(payloadObj,
        secret, {
        expiresIn: expiry
    })
}

module.exports = { signJWT }