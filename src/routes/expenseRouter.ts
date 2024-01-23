import { Router } from 'express'
import expensesController from '../controllers/expensesController'

const expenseRouter = Router()

expenseRouter.post('/api/create-expense', expensesController.createExpense)
expenseRouter.get('/api/expenses/:userId', expensesController.getExpenses)

export default expenseRouter
