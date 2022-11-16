import request from 'supertest'
import app from '../app'
import { ProductInfo } from '../dtos/product-info'
import { GeneralResponse, GeneralResponseList } from '../dtos/responses/general-responses'
import { Product } from '../models/product'
import { User } from '../models/user'
import { UsersService } from '../services/users.services'

describe('Products APIs', () => {
  let token = ''
  beforeAll(async () => {
    const usersService = new UsersService()
    const user = new User()
    user.firstname = 'test'
    user.lastname = 'test'
    user.username = 'test'
    user.password = '1234'
    const createdUser = await usersService.create(user) as User
    createdUser.password = user.password
    token = await usersService.authenticate(createdUser) as string
  })

  it('should create a new product', async () => {
    const product = new Product()
    product.name = 'TV'
    product.price = 10000
    const res = await request(app).post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(product)
      .expect(200)

    const body = JSON.parse(JSON.stringify(res.body)) as GeneralResponse<ProductInfo>
    expect(body.data).toBeDefined()
    expect(body.data.price).toEqual(product.price)
  })

  it('should return 401', async () => {
    const product = new Product()
    product.name = 'TV'
    product.price = 10000
    await request(app).post('/products')
      .send(product)
      .expect(401)
  })

  it('should return specific product', async () => {
    const product = new Product()
    product.name = 'TV'
    product.price = 10000
    let res = await request(app).post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(product)
      .expect(200)
    const createBody = JSON.parse(JSON.stringify(res.body)) as GeneralResponse<ProductInfo>

    res = await request(app).get(`/products/${createBody.data.id}`)
      .expect(200)
    const body = JSON.parse(JSON.stringify(res.body)) as GeneralResponse<ProductInfo>
    expect(body.data.name).toBe(product.name)
    expect(body.data.price).toBe(product.price)
  })

  it('should return elements', async () => {
    const res = await request(app).get(
      '/products'
    )
    const body = JSON.parse(JSON.stringify(res.body)) as GeneralResponseList<ProductInfo>
    expect(res.status).toBe(200)
    expect(body.count).toBeGreaterThan(0)
  })

  afterAll(async () => {
    const usersService = new UsersService()
    await usersService.deleteAll()
  })
})
