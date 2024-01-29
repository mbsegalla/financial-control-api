import { Request, Response } from 'express'
import expensesModel from '../models/expensesModel'
import { ParsedQs } from 'qs'

interface ExpenseQuery {
  userId: string
  paymentMethod?: string | ParsedQs | string[] | ParsedQs[]
  category?: string | ParsedQs | string[] | ParsedQs[]
  startDate?: Date
  endDate?: Date
  date?: {
    $gte: string | ParsedQs | string[] | ParsedQs[]
    $lte: string | ParsedQs | string[] | ParsedQs[]
  }
}

const createExpense = async (req: Request, res: Response) => {
  const { userId } = req.body

  try {
    if (!userId) {
      return res.status(400).send({ message: 'User not found!' })
    }

    await expensesModel.create(req.body)

    res.status(201).json({ message: 'Expense created successfully!' },)

  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

const getExpenses = async (req: Request, res: Response) => {
  const { userId } = req.params

  const page = Number(req.query.page) || 1

  const itemsPerPage = 10

  const { paymentMethod, category, startDate, endDate } = req.query

  try {
    if (!userId) {
      return res.status(400).send({ message: 'User not found!' })
    }

    const skipQty = itemsPerPage * (page - 1)

    let query: ExpenseQuery = { userId }

    if (paymentMethod) {
      query = { ...query, paymentMethod }
    }

    if (category) {
      query = { ...query, category }
    }

    if (startDate && endDate) {
      query = { ...query, date: { $gte: startDate, $lte: endDate } }
    }

    const expenses = await expensesModel.find(query).skip(skipQty).limit(itemsPerPage)

    const totalExpenses = await expensesModel.countDocuments(query)

    res.status(200).json({ expenses, totalExpenses, currentPage: page, itemsPerPage })

  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

const removeExpense = async (req: Request, res: Response) => {
  const { expenseId } = req.params

  try {
    await expensesModel.findByIdAndDelete(expenseId)

    res.status(200).json({ message: 'Expense deleted successfully!' })

  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export default { createExpense, getExpenses, removeExpense }
