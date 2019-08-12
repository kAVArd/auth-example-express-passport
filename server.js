const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./app/routes')
const passportSetup = require('./config/passport-setup')

const app = express()
const port = 8000

// config mongo
mongoose.connect(`${process.env.MONGODB_URL}`, { useNewUrlParser: true })
const connection = mongoose.connection
connection.once('open', function () {
  console.log('MongoDB database connection established successfully')
})

// express app configs
app.listen(port, () => console.log(`Backend work on port ${port}`))
app.use(bodyParser.json())
app.use(cors())

routes(app)
