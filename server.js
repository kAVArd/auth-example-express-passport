require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
require('./config/passport-setup')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')

const {
  PORT = 8000,
  SESS_LIFETIME = 1000 * 60 * 5,
  NODE_ENV = 'development',
  SESS_NAME = 'sid',
  SESS_SECRET = 'auth-example'
} = process.env
const app = express()

// Express app configs
app.use(bodyParser.json())
app.use(cors())

app.use(cookieParser('auth-example'))
app.use(session({
  name: SESS_NAME,
  cookie: {
    maxAge: SESS_LIFETIME,
    secure: NODE_ENV === 'production',
    sameSite: true
  },
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET
}))

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
app.listen(PORT, () => console.log(`Backend is working on port ${PORT}`))
app.use(userRouter)
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})
