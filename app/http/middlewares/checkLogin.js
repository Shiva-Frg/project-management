const { verifyToken } = require('../../modules/authHelper')
const { userModel } = require('../../models/user.model')

const checkLogin = async (req, res, next) => {
  try {
    const authorization =
      req?.header('authorization') ?? req?.headers?.authorization
    const [, token] = authorization?.split(' ')

    if (!authorization || !token)
      throw { status: 401, message: 'please login!' }

    const { username } = verifyToken(token)
    if (!username) throw { status: 401, message: 'please login!' }

    const foundedUser = await userModel.findOne({ username }, { password: 0 })
    if (!foundedUser) throw { status: 401, message: 'please login!' }

    req.user = foundedUser

    return next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkLogin,
}
