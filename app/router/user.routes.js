const { Router } = require('express')
const { checkLogin } = require('../http/middlewares/checkLogin')
const { UserController } = require('../http/controllers/user.controller')
const { removeEmptyFields } = require('../http/middlewares/checkDataFields')

const router = Router()

router.get('/profile', checkLogin, UserController.getProfile)
router.put(
  '/profile',
  checkLogin,
  removeEmptyFields(),
  UserController.editProfile
)

module.exports = {
  userRouters: router,
}
