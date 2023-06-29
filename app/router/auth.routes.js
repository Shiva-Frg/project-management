const { Router } = require('express')
const { AuthController } = require('../http/controllers/auth.controller')
const {
  registerValidator,
  loginValidator,
} = require('../http/validations/auth.validator')
const { expressValidatorMapper } = require('../http/middlewares/checkErrors')

const router = Router()

router.post(
  '/register',
  registerValidator(),
  expressValidatorMapper,
  AuthController.register
)
router.post('/login', loginValidator(), AuthController.login)

module.exports = {
  authRouters: router,
}
