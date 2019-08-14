const authRouter = require('express').Router()
const passport = require('passport')

authRouter.route('/login').post((req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return res.send(err)
    if (info) return res.status(info.status).json({ message: info.message })
    return res.status(200).send(user)
  })(req, res)
})

authRouter.route('/logout').get((req, res) => {
  res.send('log out')
})

module.exports = (app) => {
  app.use(authRouter)
}
