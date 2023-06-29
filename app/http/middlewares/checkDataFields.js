const omitEmpty = require('omit-empty')

const removeEmptyFields = (options = {}) => {
  return function (req, res, next) {
    try {
      Object.entries(req.body).forEach(([key, value]) => {
        if (req.body[key].includes(' ')) {
          req.body[key] = value.trim()
        }
      })
      const result = omitEmpty(req.body, options)

      req.body = result
      return next()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  removeEmptyFields,
}
