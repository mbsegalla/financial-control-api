import { model, Schema, Document } from 'mongoose'

interface User extends Document {
  username: string
  password: string
  fullName: string
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20
  },
  fullName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  }
})

export default model<User>('User', userSchema)
