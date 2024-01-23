import { model, Schema, Document, Types } from 'mongoose'

interface Expenses extends Document {
  userId: Types.ObjectId
  name: string
  price: number
  date: Date
  category: string
  paymentMethod: string
  installments: number
  comments: string
}

const expenseSchema = new Schema<Expenses>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  installments: {
    type: Number,
    required: false,
  },
  comments: {
    type: String,
    required: false,
  }
})

export default model<Expenses>('Expenses', expenseSchema)
