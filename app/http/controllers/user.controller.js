const { userModel } = require('../../models/user.model')
const path = require('path')
const { createFileLink } = require('../../modules/fileHelper')
class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user

      user.profile_image = createFileLink(user.profile_image)

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
  async uploadProfileImage(req, res, next) {
    try {
      const userId = req.user._id
      const filePath = req.file?.path?.substring(6)

      const updateUser = await userModel.updateOne(
        { _id: userId },
        { $set: { profile_image: filePath } }
      )

      if (updateUser.modifiedCount === 0)
        throw { status: '400', message: 'can not update' }

      res.status(200).json({
        status: res.statusCode,
        success: true,
        message: 'user updated succesfully!',
      })
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
