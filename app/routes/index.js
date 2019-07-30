const todoRoutes = require('./todo_routes')

module.exports = (app, db) => {
  todoRoutes(app, db)
}