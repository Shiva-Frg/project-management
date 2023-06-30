class Application {
  #express = require('express')
  #app = this.#express()
  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL)
    this.configApplication()
    this.createServer(PORT)
    this.createRoutes()
    this.errorHandler()
  }
  configApplication() {
    const path = require('path')
    this.#app.use(this.#express.static(path.join(__dirname, '..', 'public')))
    this.#app.use(this.#express.json())
    this.#app.use(this.#express.urlencoded({ extended: true }))
  }
  createServer(PORT) {
    const http = require('http')
    const server = http.createServer(this.#app)
    server.listen(PORT, () =>
      console.log(`server run on http://localhost:${PORT}`)
    )
  }
  configDatabase(DB_URL) {
    const { default: mongoose } = require('mongoose')
    mongoose
      .connect(DB_URL)
      .then(() => console.log('server connected to mongodb'))
      .catch((err) => {
        throw err
      })
  }
  errorHandler() {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        statusCode: res.statusCode,
        success: false,
        message: 'page not found!',
      })
    })
    this.#app.use((err, req, res, next) => {
      return res.status(err?.status ?? err?.statusCode ?? 500).json({
        statusCode: res.statusCode,
        success: false,
        message: err?.message ?? 'InternalServerError',
      })
    })
  }
  createRoutes() {
    const { AllRouters } = require('./router/index.routes')
    this.#app.get('/', (req, res, next) => {
      res.json({
        message: 'this is new express app',
      })
    })
    this.#app.use(AllRouters)
  }
}

module.exports = Application
