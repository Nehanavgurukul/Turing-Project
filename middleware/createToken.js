const jwt=require('jsonwebtoken')
const createError=require('http-errors')

const createToken = (data,secret_key) => {
    return jwt.sign(data, secret_key)
}

module.exports = { createToken }