const { Router } = require('express')
const { checkLogin } = require('../http/middlewares/checkLogin')
const { UserController } = require('../http/controllers/user.controller')
const { removeEmptyFields } = require('../http/middlewares/checkDataFields')
const { multerUploader } = require('../modules/fileHelper')
const { imageValidator } = require('../http/validations/user.validator')
const { expressValidatorMapper } = require('../http/middlewares/checkErrors')

const router = Router()

router.get('/profile', checkLogin, UserController.getProfile)
router.put(
  '/profile',
  checkLogin,
  removeEmptyFields(),
  UserController.editProfile
)
router.post(
  '/profile-image',
  checkLogin,
  multerUploader().single('image'),
  imageValidator(),
  expressValidatorMapper,
  UserController.uploadProfileImage
)

module.exports = {
  userRouters: router,
}
