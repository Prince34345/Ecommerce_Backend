import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import morganLogger from './config/morgan'
import logger from './config/winston'
import routes from './routes/index';

async function startServer() {
  const app = express()
  app.use(morganLogger)
  app.use(express.json())

  app.use(express.urlencoded({ extended: true }))
  app.use(routes)
  const corsOptions = {
    origin: process.env.HOST,
    credentials: true,
  }

  app.use(cors(corsOptions))

  await new Promise<void>((resolve) =>
    app.listen({ port: process.env.PORT }, () => resolve()),
  )

  if (process.env.NODE_ENV === 'development') {
    logger.info(`Server is running at http://localhost:${process.env.PORT}`)
  }

  return { app }
}

startServer()
