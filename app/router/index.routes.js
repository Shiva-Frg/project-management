const { Router } = require('express')
const { userRouters } = require('./user.routes')
const { teamRouters } = require('./team.routes')
const { projectRouters } = require('./project.routes')
const { authRouters } = require('./auth.routes')

const router = Router()

router.use('/auth', authRouters)
router.use('/user', userRouters)
router.use('/team', teamRouters)
router.use('/project', projectRouters)

module.exports = {
  AllRouters: router,
}
