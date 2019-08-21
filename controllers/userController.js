const bcrypt = require('bcrypt')
const User = require('../models/User')
const passport = require('passport')
require('../authentication/passport/local')

module.exports.postUserLogin = (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err)
      return res.send(err)
    }

    if (info.status !== 200) {
      console.log(info)
      res.status(info.status).json({ message: info.message })
    } else {
      console.log('User is logged in')
      res.status(200).json(user)
    }
  })(req, res)
}

module.exports.getUserLogout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.json({ message: 'Error with destroying session' })

    res.clearCookie(process.env.SESS_NAME)
    console.log('User is logged out')
  })
}

module.exports.postUserRegister = (req, res) => {
  const { username, password } = req.body

  // Username validation
  User.findOne({ username }).then((user) => {
    if (user) {
      return res.status(400).json({ message: 'Username already in use' })
    }

    // Hashing password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'genSalt is failed' })
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.log(err)
          return res.status(500).json({ message: 'Hashing new password is failed' })
        }

        // Adding hashing user to db
        const newUser = new User({
          username: username,
          password: hash
        })
        newUser.save().then((user) => {
          console.log('New user was successfully added')
          res.status(200).json(user)
        }).catch(err => {
          console.log(err)
          res.status(500).json({ message: 'Saving new user is failed' })
        })
      })
    })
  }).catch(err => {
    console.log(err)
    res.status(500).json({ message: 'Find user is failed' })
  })
}

module.exports.getAllUsers = (req, res) => {
  User.find({}).then((users) => {
    res.status(200).json(users)
  }).catch(err => {
    console.log(err)
    res.status(500).json({ message: 'getting all users is failed' })
  })
}
