const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const bcrypt = require('bcrypt')
const User = require('../../models/User')

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) return done(err, null, { status: 500, message: 'passport goes wrong' })
    if (!user) return (null, false, { status: 400, message: 'User not found' })

    bcrypt.compare(password, user.password, (err, res) => {
      if (err) return done(err, null, 'Bcrypt goes wrong')
      if (res) return done(null, user, { status: 200, message: 'Successful logged in' })
      else return done(null, false, { status: 400, message: 'Incorrect password' })
    })
  })
}))

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})
