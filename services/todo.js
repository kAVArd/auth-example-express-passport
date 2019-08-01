const TodoModel = require('../models/todo')

const saveTodo = (obj) => {
  const todo = new TodoModel(obj)
  return todo.save()
}

const getTodos = () => {
  return TodoModel.find()
}

const getTodo = (id) => {
  return TodoModel.findById(id)
}

const updateTodo = (id, newTodo) => {
  return TodoModel.findById(id).then(todo => {
    for (let key in newTodo) todo[key] = newTodo[key]
    return todo.save()
  })
}

const deleteTodo = (id) => {
  return TodoModel.findByIdAndDelete(id)
}

module.exports = {
  saveTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo
}
