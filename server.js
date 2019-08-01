const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')

const port = 8000

mongoose.connect(`${process.env.MONGODB_URL}`, { useNewUrlParser: true })
const connection = mongoose.connection
connection.once('open', function () {
  console.log('MongoDB database connection established successfully')
})

app.listen(port, () => console.log(`Backend work on port ${port}`))
app.use(bodyParser.json())

require('./app/routes')(app)
