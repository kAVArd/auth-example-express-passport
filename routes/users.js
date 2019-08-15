const userRouter = require('express').Router()
// const passport = require('passport')
const userController = require('../controllers/userController')

userRouter.route('/login').post(
  // (req, res) => {
  //   passport.authenticate('local', { session: false }, (err, user, info) => {
  //     console.dir(req)
  //     if (err) return res.send(err)
  //     if (info) return res.status(info.status).json({ message: info.message })
  //     return res.status(200).send(user)
  //   })(req, res)
  userController.postUserLogin
)

userRouter.route('/register').post(userController.postUserRegister)

userRouter.route('/users').get(userController.getAllUsers)

module.exports = userRouter
