require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const passport = require('passport')
require('./config/passport-setup')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')

const app = express()
const port = 8000

// Express app configs
app.use(bodyParser.json())
app.use(cors())

// Flash Middlewares
app.use(cookieParser('auth-example'))
app.use(session({
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true,
  secret: 'auth-example'
}))
app.use(flash())

// Global - Res.locals - Middleware
app.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('flashSuccess')
  res.locals.flashError = req.flash('flashError')

  next()
})

// Passport initialize
app.use(passport.initialize())
app.use(passport.session())

// config MongoDB
mongoose.connect(`${process.env.MONGODB_URL}`, { useNewUrlParser: true })
const connection = mongoose.connection
connection.once('open', function () {
  console.log('MongoDB database connection established successfully')
})

// Routes
app.listen(port, () => console.log(`Backend is working on port ${port}`))
app.use(userRouter)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' })
})
