import express from 'express'
import 'dotenv/config'
import { connect } from './database'
import userRouter from './routes/userRouter'
import cors from 'cors'
import axios from 'axios'
import expenseRouter from './routes/expenseRouter'

connect()

const app = express()

app.use(express.json())

app.use(cors())

app.use(userRouter)
app.use(expenseRouter)
app.use(axios)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const apiPort = process.env.API_PORT

app.listen(apiPort, () => {
  console.log(`Server listening on port ${apiPort}`)
})
