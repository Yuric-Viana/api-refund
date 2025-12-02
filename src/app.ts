import 'express-async-errors'

import express from 'express'
import cors from 'cors'

import upload from './configs/upload'

import { errorHandling } from './middlewares/error-handling'

import { route } from './routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/uploads", express.static(upload.UPLOAD_FOLDER))

app.use(route)
app.use(errorHandling)

export { app }
