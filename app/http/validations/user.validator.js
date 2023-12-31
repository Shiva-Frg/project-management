const { body } = require('express-validator')
const path = require('path')
const fs = require('fs')

const imageValidator = () => [
  body('image').custom((value, { req }) => {
    if (Object.keys(req.file).length === 0) throw 'please select a picture'

    const exts = ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    const ext = path.extname(req.file.originalname)

    if (!exts.includes(ext)) {
      fs.unlinkSync(path.join(__dirname, '..', '..', '..', req.file.path))
      throw 'image format is not valid!'
    }

    const maxSize = 2 * 1024 * 1024
    if (req.file.size > maxSize) {
      fs.unlinkSync(path.join(__dirname, '..', '..', '..', req.file.path))
      throw 'file size is not valid! (maxSize: 2MB)'
    }

    req.file.path = req.file.path.replace(/\\/g, '/')

    return true
  }),
]

module.exports = {
  imageValidator,
}
