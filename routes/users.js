const userRouter = require('express').Router()
// const passport = require('passport')
const userController = require('../controllers/userController')

userRouter.route('/login').post(userController.postUserLogin)

userRouter.route('/logout').get(userController.getUserLogout)

userRouter.route('/register').post(userController.postUserRegister)

userRouter.route('/users').get(userController.getAllUsers)

module.exports = userRouter
