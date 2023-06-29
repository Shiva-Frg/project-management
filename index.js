const Application = require('./app/server')

require('dotenv').config()

const PORT = 3000
const DB_URL = 'mongodb://127.0.0.1:27017/project-management'

new Application(PORT, DB_URL)
