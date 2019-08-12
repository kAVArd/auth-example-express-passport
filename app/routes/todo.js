const todoService = require('../../services/todo')
const todoRoutes = require('express').Router()

todoRoutes.route('/').post((req, res) => {
  todoService.saveTodo(req.body).then(todo => res.send(todo))
    .catch(error => res.status(400).send(error))
})

todoRoutes.route('/').get((req, res) => {
  todoService.getTodos().then(todos => res.send(todos))
    .catch(error => res.send(error))
})

todoRoutes.route('/:id').get((req, res) => {
  todoService.getTodo(req.params.id).then(todo => res.send(todo))
    .catch(error => res.status(404).send(error))
})

todoRoutes.route('/:id').put((req, res) => {
  todoService.updateTodo(req.params.id, req.body).then(todo => res.send(todo))
    .catch(error => res.status(400).send(error))
})

todoRoutes.route('/:id').delete((req, res) => {
  todoService.deleteTodo(req.params.id).then(todo => res.send(todo))
    .catch(error => res.status(404).send(error))
})

module.exports = todoRoutes
