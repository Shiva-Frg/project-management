const { param } = require('express-validator')

const mongoIdValidator = () => [
  param('id').isMongoId().withMessage('ID is not valid!'),
]

module.exports = {
  mongoIdValidator,
}
