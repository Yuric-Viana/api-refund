import express from 'express'
import cors from 'cors'
import 'express-async-errors'

import { errorHandling } from './middlewares/error-handling'

import { route } from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(route)

app.use(errorHandling)

export { app }
