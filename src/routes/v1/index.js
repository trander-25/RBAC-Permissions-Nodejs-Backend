import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userRoute } from '~/routes/v1/userRoute'
import { dashboardRoute } from '~/routes/v1/dashboardRoute'

const Router = express.Router()

// Status endpoint
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' })
})

// User routes
Router.use('/users', userRoute)

// Dashboard routes
Router.use('/dashboards', dashboardRoute)

export const APIs_V1 = Router
