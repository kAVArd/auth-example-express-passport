const authRouter = require('express').Router()

authRouter.route('/login/google').get((req, res) => {
  res.send('auth with passport google')
})

authRouter.route('/logout').get((req, res) => {
  res.send('log out')
})
// auth login
module.exports = authRouter
