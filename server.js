const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./app/routes/auth')
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
app.listen(port, () => console.log(`Backend is working on port ${port}`))
app.use(bodyParser.json())
app.use(cors())

authRouter(app)
