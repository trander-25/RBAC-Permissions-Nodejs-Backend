import express from 'express'
import { userController } from '~/controllers/userController'

const Router = express.Router()

// Login API
Router.route('/login')
  .post(userController.login)

// Logout API
Router.route('/logout')
  .delete(userController.logout)

// Refresh token API
Router.route('/refresh_token')
  .put(userController.refreshToken)

export const userRoute = Router
