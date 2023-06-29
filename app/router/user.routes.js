const { Router } = require('express')
const { checkLogin } = require('../http/middlewares/checkLogin')
const { UserController } = require('../http/controllers/user.controller')

const router = Router()

router.get('/profile', checkLogin, UserController.getProfile)

module.exports = {
  userRouters: router,
}
