const { body } = require('express-validator')
const { userModel } = require('../../models/user.model')

const registerValidator = () => [
  body('username').custom(async (value) => {
    if (value) {
      const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
      if (usernameRegex.test(value)) {
        const foundedUser = await userModel.findOne({ username: value })
        if (foundedUser) throw 'username is exist'
        return true
      }
      throw 'username is not valid'
    }
    throw 'username can not be empty!'
  }),
  body('email')
    .isEmail()
    .withMessage('email is not valid')
    .custom(async (email) => {
      const foundedUser = await userModel.findOne({ email })
      if (foundedUser) throw 'email is exist'
    }),
  body('mobile')
    .isMobilePhone('fa-IR')
    .withMessage('mobile is not valid')
    .custom(async (mobile) => {
      const foundedUser = await userModel.findOne({ mobile })
      if (foundedUser) throw 'mobile is exist'
    }),
  body('password')
    .isLength({ min: 6, max: 12 })
    .withMessage('password must be between 6 and 12 characters')
    .custom((value, { req }) => {
      if (!value) throw 'password is required'
      if (value !== req.body.confirm_password) throw 'passwords is not match'
      return true
    }),
]

const loginValidator = () => [
  body('username')
    .notEmpty()
    .withMessage('username can not be empty!')
    .custom((username) => {
      const userNameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
      if (!userNameRegex.test(username)) throw 'username is not valid!'
      return true
    }),
  body('password')
    .isLength({ min: 6, max: 12 })
    .withMessage('password must be between 6 and 12 characters'),
]

module.exports = {
  registerValidator,
  loginValidator,
}
