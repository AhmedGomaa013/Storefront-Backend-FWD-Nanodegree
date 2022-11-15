import express, { Request, Response } from 'express'
import { GeneralResponse, GeneralResponseList } from '../dtos/responses/general-responses'
import { UserInfo } from '../dtos/user-info'
import authorized from '../middlewares/check-jwt'
import { User } from '../models/user'
import { UsersService } from '../services/users.services'

const usersService = new UsersService()
const index = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await usersService.index()
    if (users == null) {
      return res.status(400).send('Error')
    }

    const usersInfo = User.ConvertToUserInfoList(users)

    const response = new GeneralResponseList<UserInfo>()
    response.data = usersInfo
    response.count = usersInfo.length

    return res.json(response)
  } catch (err) {
    return res.status(400).send('Error')
  }
}

const show = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params
    if (id === '' || isNaN(Number(id))) {
      return res.status(400).send('wrong parameters')
    }
    const user = await usersService.show(Number(id))
    if (user == null) {
      return res.status(400).send('Error')
    }
    const userDto = User.ConvertToUserInfo(user)

    const response = new GeneralResponse<UserInfo>()
    response.data = userDto

    res.json(response)
  } catch (err) {
    return res.status(400).send('Error')
  }
}

const create = async (req: Request, res: Response): Promise<any> => {
  try {
    const userDto = JSON.parse(JSON.stringify(req.body)) as UserInfo
    const user = User.ConvertFromUserInfo(userDto)
    if (!user.validateEntity()) {
      return res.status(400).send('Wrong Values')
    }

    const userReturned = await usersService.create(user)
    if (userReturned == null) {
      return res.status(400).send('Error')
    }

    const response = new GeneralResponse<UserInfo>()
    response.data = User.ConvertToUserInfo(userReturned)

    res.json(response)
  } catch (err) {
    return res.status(400).send('Error')
  }
}

const authenticate = async (req: Request, res: Response): Promise<any> => {
  try {
    const userDto = JSON.parse(JSON.stringify(req.body)) as UserInfo

    const user = User.ConvertFromUserInfo(userDto)
    if (!user.validateEntity()) {
      return res.status(400).send('Wrong Values')
    }

    const tokenReturned = await usersService.authenticate(user)
    if (tokenReturned == null) {
      return res.status(400).send('Error')
    } else if (isNaN(Number(tokenReturned))) {
      return res.status(404).send(tokenReturned)
    }

    return res.send(tokenReturned)
  } catch (err) {
    return res.status(400).send('Error')
  }
}

const usersRoutes = (app: express.Application): any => {
  app.get('/users', authorized, index)
  app.get('/users/:id', authorized, show)
  app.post('/users/create', create)
  app.post('/users/authenticate', authenticate)
}

export default usersRoutes
