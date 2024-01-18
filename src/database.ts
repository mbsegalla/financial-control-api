import mongoose, { ConnectOptions } from 'mongoose'

const mongoUrl = process.env.MONGO_URL || ''

const connect = () => {
  mongoose.connect(mongoUrl, {} as ConnectOptions).then(() => {
    console.log('Connected to MongoDB')
  }).catch((err) => {
    console.log('Error connecting to MongoDB', err)
  })
}

export { connect }
