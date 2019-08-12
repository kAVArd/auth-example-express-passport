const authRouter = require('express').Router()
const passport = require('passport')

authRouter.route('/login/google').get()

authRouter.route('/logout').get((req, res) => {
  res.send('log out')
})
// auth login
module.exports = authRouter
