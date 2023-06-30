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

module.exports = {
  createFileDestination,
  multerUploader,
}
