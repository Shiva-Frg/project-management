const { hashSync, genSaltSync } = require('bcrypt')
const { userModel } = require('../../models/user.model')
const { hashPassword } = require('../../modules/authHelper')

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
  login() {}
  resetPassword() {}
}

module.exports = {
  AuthController: new AuthController(),
}
