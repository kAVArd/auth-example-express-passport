const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports.postUserLogin = (req, res) => {
  console.log(req.body)
  res.send('ok')
}

module.exports.postUserRegister = (req, res) => {
  const { username, password } = req.body

  // Username validation
  User.findOne({ username }).then((user) => {
    if (user) {
      req.flash('flashError', 'Username already in use')
      return res.status(400).json({ message: 'Username already in use' })
    }

    // Hashing password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) res.status(500).json({ message: 'Something wrong with genSalt' })
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return res.status(500).json({ message: 'Something wrong with hashing' })

        // Adding hashing user to db
        const newUser = new User({
          username: username,
          password: hash
        })
        newUser.save().then((user) => {
          console.log('New user was successfully added')
          req.flash('flashSuccess', 'Registered successfully')
          res.status(200).send(user)
        }).catch(err => console.log(err))
      })
    })
  }).catch(err => console.log(err))
}

module.exports.getAllUsers = (req, res) => {
  User.find({}).then((users) => {
    console.dir(res)
    res.status(200).json({
      users,
      flashSuccess: res.locals.flashSuccess,
      flashError: res.locals.flashError
    })
  }).catch(err => {
    console.log(err)
    res.status(500).json({ message: 'Mongo goes wrong' })
  })
}
