const { genSaltSync, hashSync } = require('bcrypt')
const jwt = require('jsonwebtoken')

const hashPassword = (password) => {
  const salt = genSaltSync(10)
  return hashSync(password, salt)
}

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '3 days' })
}

const verifyToken = (token) => {
  const result = jwt.verify(token, process.env.SECRET_KEY)
  if (!result?.username) throw { status: 401, message: 'please login!' }
  return result
}

module.exports = {
  hashPassword,
  generateToken,
  verifyToken,
}
