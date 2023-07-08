const { body } = require('express-validator')

const createProjectValidator = () => [
  body('title').notEmpty().withMessage('title can not be empty'),
  body('tags')
    .isArray({ min: 0, max: 10 })
    .withMessage('The maximum number of hashtags is ten'),
  body('text')
    .notEmpty()
    .isLength({ min: 25 })
    .withMessage('text can not be empty and must have 25 characters at least'),
]

module.exports = {
  createProjectValidator,
}
