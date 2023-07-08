const { projectModel } = require('../../models/project.model')
const { createFileLink } = require('../../modules/fileHelper')
class ProjectController {
  async createProject(req, res, next) {
    try {
      const userId = req.user._id
      const { title, text, image, tags } = req.body

      const createdProject = await projectModel.create({
        title: title,
        text: text,
        owner: userId,
        image: image,
        tags: tags,
      })

      if (!createdProject)
        throw { status: 400, message: 'could not create project' }

      res.status(201).json({
        status: res.statusCode,
        success: true,
        message: 'project created successfully!',
      })
    } catch (error) {
      next(error)
    }
  }
  async getAllProjects(req, res, next) {
    try {
      const userId = req.user._id
      console.log(userId)
      const foundedProjects = await projectModel.find({ owner: userId })
      console.log(foundedProjects)
      foundedProjects.map((item) => createFileLink(item.image))
      res.status(200).json({
        status: res.statusCode,
        success: true,
        foundedProjects,
      })
    } catch (error) {
      next(error)
    }
  }
  async getProjectById(req, res, next) {
    try {
      const owner = req.user._id
      const projectId = req.params.id

      const foundedProject = await projectModel.findOne({
        owner: owner,
        _id: projectId,
      })

      if (!foundedProject) throw { status: 404, message: 'project not found!' }

      foundedProject.image = createFileLink(foundedProject.image)

      res.status(200).json({
        status: res.statusCode,
        success: true,
        foundedProject,
      })
    } catch (error) {
      next(error)
    }
  }
  getAllProjectsByTeam() {}
  getAllProjectsByUser() {}
  async updateProject(req, res, next) {
    try {
      const userId = req.user._id
      const projectId = req.params.id
      const data = { ...req.body }

      const foundedProject = await projectModel.findOne({
        _id: projectId,
        owner: userId,
      })

      if (!foundedProject) throw { status: 404, message: 'project not found!' }

      const updatedProject = await projectModel.updateOne(
        { _id: foundedProject._id },
        { $set: data }
      )

      if (updatedProject.modifiedCount === 0)
        throw { status: 404, message: 'can not update project!' }

      return res.status(200).json({
        status: res.statusCode,
        success: true,
        message: 'project updated successfuly!',
      })
    } catch (error) {
      next(error)
    }
  }
  async updateProjectImage(req, res, next) {
    try {
      const userId = req.user._id
      const projectId = req.params.id
      const { image } = req.body

      const foundedProject = await projectModel.findOne({
        _id: projectId,
        owner: userId,
      })

      if (!foundedProject) throw { status: 404, message: 'project not found!' }

      const updatedProject = await projectModel.updateOne(
        { _id: foundedProject._id },
        { $set: image }
      )

      if (updatedProject.modifiedCount === 0)
        throw { status: 404, message: 'can not update projects image!' }

      return res.status(200).json({
        status: res.statusCode,
        success: true,
        message: 'projects image updated successfuly!',
      })
    } catch (error) {
      next(error)
    }
  }
  async removeProject(req, res, next) {
    try {
      const owner = req.user._id
      const projectId = req.params.id

      const foundedProject = await projectModel.findOne({
        owner: owner,
        _id: projectId,
      })

      if (!foundedProject) throw { status: 404, message: 'project not found!' }

      const deletedProject = await projectModel.deleteOne({
        _id: foundedProject._id,
      })

      if (deletedProject.deletedCount === 0)
        throw { status: 404, message: 'can not delete project!' }

      return res.status(200).json({
        status: res.statusCode,
        success: true,
        message: 'project deleted successfuly!',
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  ProjectController: new ProjectController(),
}
