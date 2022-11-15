import express, { Request, Response } from 'express'
import authorized from '../middlewares/check-jwt'
import jwt from 'jsonwebtoken'
import { OrdersService } from '../services/order.service'
import { JwtPayload } from '../dtos/jwt-payload'
import { GeneralResponse, GeneralResponseList } from '../dtos/responses/general-responses'
import { OrderDetails } from '../dtos/order-details'

const ordersService = new OrdersService()
const getActiveOrders = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const payload = jwt.verify(token as string, process.env.JWT_SECRET as jwt.Secret) as JwtPayload
    const orders = await ordersService.getActiveOrders(payload.user.id)
    if (orders == null) {
      return res.status(400).send('Error')
    }

    const response = new GeneralResponseList<OrderDetails>()
    response.data = orders
    response.count = orders.length

    res.json(response)
  } catch (err) {
    return res.status(400).send('Error')
  }
}

const getCompletedOrders = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const payload = jwt.verify(token as string, process.env.JWT_SECRET as jwt.Secret) as JwtPayload
    const orders = await ordersService.getCompletedOrders(payload.user.id)
    if (orders == null) {
      return res.status(400).send('Error')
    }

    const response = new GeneralResponseList<OrderDetails>()
    response.data = orders
    response.count = orders.length

    res.json(response)
  } catch (err) {
    return res.status(400).send('Error')
  }
}

const placeOrders = async (req: Request, res: Response): Promise<any> => {
  try {
    const order = JSON.parse(JSON.stringify(req.body)) as OrderDetails
    const token = req.headers.authorization?.split(' ')[1]
    const payload = jwt.verify(token as string, process.env.JWT_SECRET as jwt.Secret) as JwtPayload
    const returedOrder = await ordersService.createNewOrder(payload.user.id, order.products)

    if (returedOrder == null) {
      return res.status(400).send('Error')
    }

    const response = new GeneralResponse()
    response.data = returedOrder

    return res.json(response)
  } catch (err) {
    return res.status(400).send('Error')
  }
}

const updateOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const order = JSON.parse(JSON.stringify(req.body)) as OrderDetails
    const token = req.headers.authorization?.split(' ')[1]
    const payload = jwt.verify(token as string, process.env.JWT_SECRET as jwt.Secret) as JwtPayload
    await ordersService.updateExistingOrder(payload.user.id, order)

    return res.status(200).send('')
  } catch (err) {
    return res.status(400).send('Error')
  }
}

const ordersRoutes = (app: express.Application): any => {
  app.get('/orders/active', authorized, getActiveOrders)
  app.get('/orders/completed', authorized, getCompletedOrders)
  app.post('/orders', authorized, placeOrders)
  app.put('/orders', authorized, updateOrder)
}

export default ordersRoutes
