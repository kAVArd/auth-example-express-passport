const todoRoutes = require('./todo')
const authRoutes = require('./auth')

module.exports = (app) => {
  app.use('/todos', todoRoutes)
  app.use(authRoutes)
}
