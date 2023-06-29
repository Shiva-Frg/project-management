const { userModel } = require('../../models/user.model')

class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user
      res.status(200).json({
        status: res.statusCode,
        success: true,
        user,
      })
    } catch (error) {
      next(error)
    }
  }
  async editProfile(req, res, next) {
    try {
      const userId = req.user._id
      const userData = { ...req.body }

      const updatedUser = await userModel.updateOne(
        { _id: userId },
        { $set: userData }
      )

      if (updatedUser.modifiedCount > 0) {
        return res.status(200).json({
          status: res.statusCode,
          success: true,
          message: 'user updated successfully!',
        })
      }

      throw { status: 400, message: 'can not update user!' }
    } catch (error) {
      next(error)
    }
  }
  addSkills() {}
  editSkills() {}
  acceptInviteInTeam() {}
  rejectInviteInTeam() {}
}

module.exports = {
  UserController: new UserController(),
}
