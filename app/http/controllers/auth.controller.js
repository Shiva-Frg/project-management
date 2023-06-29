const { compareSync } = require('bcrypt')
const { userModel } = require('../../models/user.model')
const { hashPassword, generateToken } = require('../../modules/authHelper')

class AuthController {
  async register(req, res, next) {
    try {
      const { username, email, mobile, password } = req.body
      const hashedPassword = hashPassword(password)
      const newUser = await userModel.create({
        username,
        email,
        mobile,
        password: hashedPassword,
      })
      res.json(newUser)
    } catch (error) {
      next(error)
    }
  }
  async login(req, res, next) {
    try {
      const { username, password } = req.body
      const foundedUser = await userModel.findOne({ username })
      if (!foundedUser)
        throw { status: '401', success: false, message: 'user not found' }
      const checkPassword = compareSync(password, foundedUser.password)
      if (!checkPassword)
        throw {
          status: '401',
          success: false,
          message: 'username or password is not correct',
        }
      const token = generateToken({
        id: foundedUser._id,
        username: foundedUser.username,
      })
      foundedUser.token = token
      foundedUser.save()
      res.json({
        statusCode: res.statusCode,
        success: true,
        message: 'login successfully!',
        token: token,
      })
    } catch (error) {
      next(error)
    }
  }
  resetPassword() {}
}

module.exports = {
  AuthController: new AuthController(),
}
