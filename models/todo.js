const mongoose = require('mongoose')
const Schema = mongoose.Schema

let TodoSchema = new Schema({
  title: {
    required: true,
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
  location: {
    type: String
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
