const { Router } = require('express')
const { ProjectController } = require('../http/controllers/project.controller')
const { checkLogin } = require('../http/middlewares/checkLogin')
const { expressValidatorMapper } = require('../http/middlewares/checkErrors')
const {
  createProjectValidator,
} = require('../http/validations/project.validator')
const fileUpload = require('express-fileupload')
const { expressFileUploader } = require('../modules/fileHelper')
const { mongoIdValidator } = require('../http/validations/mongoId.validator')
const { removeEmptyFields } = require('../http/middlewares/checkDataFields')

const router = Router()

router.post(
  '/create',
  checkLogin,
  fileUpload(),
  expressFileUploader,
  createProjectValidator(),
  expressValidatorMapper,
  ProjectController.createProject
)

router.get('/', checkLogin, ProjectController.getAllProjects)
router.get(
  '/:id',
  checkLogin,
  mongoIdValidator(),
  expressValidatorMapper,
  ProjectController.getProjectById
)
router.put(
  '/:id',
  checkLogin,
  mongoIdValidator(),
  expressValidatorMapper,
  removeEmptyFields(),
  ProjectController.updateProject
)
router.put(
  '/image/:id',
  fileUpload(),
  checkLogin,
  mongoIdValidator(),
  expressValidatorMapper,
  expressFileUploader,
  ProjectController.updateProject
)
router.delete(
  '/:id',
  checkLogin,
  mongoIdValidator(),
  expressValidatorMapper,
  ProjectController.removeProject
)

module.exports = {
  projectRouters: router,
}
