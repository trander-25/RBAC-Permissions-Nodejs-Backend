/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { corsOptions } from '~/config/corsOptions'
import { APIs_V1 } from '~/routes/v1/'

const START_SERVER = () => {
  // Initialize Express
  const app = express()

  // Disable caching
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })

  // Enable cookie parsing
  app.use(cookieParser())

  // Enable CORS
  app.use(cors(corsOptions))

  // Parse JSON requests
  app.use(express.json())

  // Setup API routes
  app.use('/v1', APIs_V1)

  // TODO: Move to environment variables
  const LOCAL_DEV_APP_PORT = 8020
  const LOCAL_DEV_APP_HOST = 'localhost'
  const AUTHOR = 'Trander'
  app.listen(LOCAL_DEV_APP_PORT, LOCAL_DEV_APP_HOST, () => {
    console.log(`Local DEV: Hello ${AUTHOR}, Back-end Server is running successfully at Host: ${LOCAL_DEV_APP_HOST} and Port: ${LOCAL_DEV_APP_PORT}`)
  })
}

(async () => {
  try {
    // Start server
    console.log('Starting Server...')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
