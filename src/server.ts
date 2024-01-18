import express from 'express'
import 'dotenv/config'
import { connect } from './database'

const app = express()
connect()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const apiPort = process.env.API_PORT

app.listen(apiPort, () => {
  console.log(`Server listening on port ${apiPort}`)
})
