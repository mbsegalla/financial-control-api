import { Request, Response } from 'express'
import userModel from '../models/userModel'

const createUser = async (req: Request, res: Response) => {
  const { username } = req.body

  try {
    const userExists = await userModel.findOne({ username })

    if (userExists) {
      return res.status(400).send({ message: 'User already exists!' })
    }

    const newUser = await userModel.create(req.body)
    res.status(201).json(newUser)
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body

  try {
    const userExists = await userModel.findOne({ username })
    const userId = userExists?.id ?? ''
    const fullName = userExists?.fullName ?? ''

    if (!userExists) {
      return res.status(400).send({ message: 'Usuário não encontrado!', code: 'userNotFound' })
    }

    if (password !== userExists.password) {
      return res.status(400).send({ message: 'Senha incorreta!', code: 'incorrectPassword' })
    }

    res.status(200).send({ message: 'Login successful!', userInfo: { userId, fullName } })

  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export default { createUser, login }
