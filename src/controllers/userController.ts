import { Request, Response } from 'express'

const getUsers = (req: Request, res: Response) => {
  res.send('Hello World!')
}

export default { getUsers }
