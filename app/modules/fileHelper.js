const multer = require('multer')
const path = require('path')
const fs = require('fs')

const createFileDestination = () => {
  const Year = new Date().getFullYear().toString()
  const Month = new Date().getMonth().toString()
  const Day = new Date().getDay().toString()

  const uplaodPath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'uploads',
    Year,
    Month,
    Day
  )

  fs.mkdirSync(uplaodPath, { recursive: true })

  return path.join('public', 'uploads', Year, Month, Day)
}

const createFileLink = (fileAddress) => {
  return req.protocol + '://' + req.get('host') + fileAddress
}

const multerUploader = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, createFileDestination())
    },
    filename: (req, file, cb) => {
      const type = path.extname(file?.originalname)
      cb(null, Date.now() + type)
    },
  })
  return multer({ storage: storage })
}

const expressFileUploader = (req, res, next) => {
  try {
    if (req.file || Object.keys(req.files).length === 0)
      throw { status: 400, message: 'please upload project image!' }
    let image = req.files.image

    const exts = ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    const ext = path.extname(image.name)
    if (!exts.includes(ext))
      throw { status: 400, message: 'image format is not valid!' }

    const maxSize = 2 * 1024 * 1024
    if (image.size > maxSize)
      throw { status: 400, message: 'file size is not valid! (maxSize: 2MB)' }

    const image_path = path.join(
      createFileDestination(),
      Date.now() + path.extname(image.name)
    )
    req.body.image = image_path.substring(6).replace(/\\/g, '/')

    const uplaodPath = path.join(__dirname, '..', '..', image_path)

    image.mv(uplaodPath, (err) => {
      if (err) throw { status: 400, message: 'upload project image faild' }
      next()
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createFileDestination,
  createFileLink,
  multerUploader,
  expressFileUploader,
}
