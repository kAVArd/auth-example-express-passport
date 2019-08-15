const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, (err, user) => {
      if (err) return done(err, false, { status: 500, message: 'Database errors' })
      if (!user) return done(null, false, { status: 404, message: 'Cant find user' })
      return user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err, false, { status: 500, message: 'Compare errors' })
        if (!isMatch) return done(null, false, { status: 400, message: 'Incorrect password' })
        return done(null, user)
      })
    })
  }
))

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})
