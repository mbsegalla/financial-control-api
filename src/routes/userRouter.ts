import { Router } from 'express'
import userController from '../controllers/userController'

const userRouter = Router()

userRouter.post('/api/login', userController.login)
userRouter.post('/api/siginup', userController.createUser)

export default userRouter
