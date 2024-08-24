import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import morganLogger from './config/morgan'
import logger from './config/winston'
import routes from './routes/index'
import ApiError from './utils/ApiError'
import httpStatus from 'http-status'

async function startServer() {
  const app = express()
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT' ,'DELETE', 'HEAD'],
    credentials: true,
  }));
  app.get("/", (req, res, next) => {
    res.json({message:"Welcome to the Backend of Ecommerce.."})
  })
  app.use(morganLogger)
  app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(routes)
  // send 404 for an unknown api request
app.use((req, res, next) => {
    next(
      new ApiError(
        'Not Found',
        httpStatus.NOT_FOUND,
        httpStatus[httpStatus.NOT_FOUND],
      ),
    ) 
})

  // global error handler
  app.use((err, req, res, next) => {
    const { statusCode, message, data } = err
    const response = {
      ...data,
      message,
      status: statusCode,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    }
    res.status(statusCode).json(response)
  })

  await new Promise<void>((resolve) =>
    app.listen({ port: process.env.PORT }, () => resolve()),
  )

  if (process.env.NODE_ENV === 'development') {
    logger.info(`Server is running at http://localhost:${process.env.PORT}`)
  }

  return { app }
}

startServer()
