import request from 'supertest'
import app from '../app'
import { OrderDetails } from '../dtos/order-details'
import { ProductOrderInfo } from '../dtos/product-order-info'

import { GeneralResponse, GeneralResponseList } from '../dtos/responses/general-responses'
import { Product } from '../models/product'
import { User } from '../models/user'
import { ProductsService } from '../services/product.service'
import { UsersService } from '../services/users.services'

describe('Orders APIs Test Cases', () => {
  let token = ''
  let globalProduct: Product
  beforeAll(async () => {
    const usersService = new UsersService()
    const user = new User()
    user.firstname = 'test'
    user.lastname = 'test'
    user.username = `randomUser${Math.floor(Math.random() * 1000)}`
    user.password = '1234'
    const createdUser = await usersService.create(user) as User
    createdUser.password = user.password
    token = await usersService.authenticate(user) as string

    const productsService = new ProductsService()
    const product = new Product()
    product.name = 'TV'
    product.price = 10000
    globalProduct = await productsService.create(product) as Product
  })

  it('should return 200 and create order', async () => {
    const order = new OrderDetails()
    const product = new ProductOrderInfo()
    product.id = globalProduct.id
    product.quantity = 4
    order.products.push(product)

    const res = await request(app).post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(order)
      .expect(200)

    const body = JSON.parse(JSON.stringify(res.body)) as GeneralResponse<OrderDetails>

    expect(body.data.id).toBeDefined()
  })

  it('should return 401 for create order', async () => {
    const order = new OrderDetails()
    const product = new ProductOrderInfo()
    product.id = globalProduct.id
    product.quantity = 4
    order.products.push(product)

    await request(app).post('/orders')
      .send(order)
      .expect(401)
  })

  it('should return 200 and update order', async () => {
    const order = new OrderDetails()
    const product = new ProductOrderInfo()
    product.id = globalProduct.id
    product.quantity = 4
    order.products.push(product)

    let res = await request(app).post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(order)
      .expect(200)

    const body = JSON.parse(JSON.stringify(res.body)) as GeneralResponse<OrderDetails>
    order.id = body.data.id

    res = await request(app).put('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(order)
      .expect(200)

    expect(res.text).toBe('updated')
  })

  it('should return 401 for update order', async () => {
    const order = new OrderDetails()
    const product = new ProductOrderInfo()
    product.id = globalProduct.id
    product.quantity = 4
    order.products.push(product)

    let res = await request(app).post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(order)
      .expect(200)

    const body = JSON.parse(JSON.stringify(res.body)) as GeneralResponse<OrderDetails>
    order.id = body.data.id

    res = await request(app).put('/orders')
      .send(order)
      .expect(401)
  })

  it('should return 200 and get active orders', async () => {
    const order = new OrderDetails()
    const product = new ProductOrderInfo()
    product.id = globalProduct.id
    product.quantity = 4
    order.products.push(product)

    let res = await request(app).post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(order)
      .expect(200)

    res = await request(app).get('/orders/active')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const body = JSON.parse(JSON.stringify(res.body)) as GeneralResponseList<OrderDetails>
    expect(body.count).toBeGreaterThan(0)
  })

  it('should return 401 for get active orders', async () => {
    const order = new OrderDetails()
    const product = new ProductOrderInfo()
    product.id = globalProduct.id
    product.quantity = 4
    order.products.push(product)

    await request(app).post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(order)
      .expect(200)

    await request(app).get('/orders/active')
      .expect(401)
  })

  it('should return 200 and get completed orders', async () => {
    const order = new OrderDetails()
    const product = new ProductOrderInfo()
    product.id = globalProduct.id
    product.quantity = 4
    order.products.push(product)

    let res = await request(app).post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(order)
      .expect(200)

    const orderBody = JSON.parse(JSON.stringify(res.body)) as GeneralResponse<OrderDetails>
    order.id = orderBody.data.id
    order.status = 'COMPLETED'

    res = await request(app).put('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(order)
      .expect(200)
    res = await request(app).get('/orders/completed')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const body = JSON.parse(JSON.stringify(res.body)) as GeneralResponseList<OrderDetails>
    expect(body.count).toBeGreaterThan(0)
  })

  it('should return 401', async () => {
    const order = new OrderDetails()
    const product = new ProductOrderInfo()
    product.id = globalProduct.id
    product.quantity = 4
    order.products.push(product)

    let res = await request(app).post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(order)
      .expect(200)

    const orderBody = JSON.parse(JSON.stringify(res.body)) as GeneralResponse<OrderDetails>
    order.id = orderBody.data.id
    order.status = 'COMPLETED'

    res = await request(app).put('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(order)
      .expect(200)

    res = await request(app).get('/orders/completed')
      .expect(401)
  })
})
