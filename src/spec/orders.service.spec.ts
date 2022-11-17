import { OrderDetails } from '../dtos/order-details'
import { ProductOrderInfo } from '../dtos/product-order-info'
import { Product } from '../models/product'
import { User } from '../models/user'
import { OrdersService } from '../services/order.service'
import { ProductsService } from '../services/product.service'
import { UsersService } from '../services/users.services'

describe('Orders Service Test Cases', () => {
  let user: User
  let globalProduct: Product
  const ordersService = new OrdersService()
  beforeAll(async () => {
    const usersService = new UsersService()
    const newUser = new User()
    newUser.firstname = 'test'
    newUser.lastname = 'test'
    newUser.username = `randomUser${Math.floor(Math.random() * 1000)}`
    newUser.password = '1234'
    const createdUser = await usersService.create(newUser) as User
    newUser.id = createdUser.id
    user = newUser

    const productsService = new ProductsService()
    const product = new Product()
    product.name = 'TV'
    product.price = 10000
    globalProduct = await productsService.create(product) as Product
  })
  it('should create new order', async () => {
    const order = new OrderDetails()
    const product = new ProductOrderInfo()
    product.id = globalProduct.id
    product.quantity = 4
    order.products.push(product)

    const createdOrder = await ordersService.createNewOrder(user.id, order.products)
    expect(createdOrder).toBeDefined()
    expect(createdOrder?.status).toBe('ACTIVE')
  })

  it('should create new order and update this order', async () => {
    const order = new OrderDetails()
    const product = new ProductOrderInfo()
    product.id = globalProduct.id
    product.quantity = 4
    order.products.push(product)

    const createdOrder = await ordersService.createNewOrder(user.id, order.products)
    expect(createdOrder).toBeDefined()

    order.id = createdOrder?.id as number
    order.status = 'COMPLETED'
    const result = await ordersService.updateExistingOrder(user.id, order)
    expect(result).toBeDefined()
    expect(result).toBe(true)
  })

  it('should create new order and get all active orders', async () => {
    const order = new OrderDetails()
    const product = new ProductOrderInfo()
    product.id = globalProduct.id
    product.quantity = 4
    order.products.push(product)

    const createdOrder = await ordersService.createNewOrder(user.id, order.products)
    expect(createdOrder).toBeDefined()

    const result = await ordersService.getActiveOrders(user.id)
    expect(result).toBeDefined()
    expect(result?.length).toBeGreaterThan(0)
  })

  it('should create new order and get all completed orders', async () => {
    const order = new OrderDetails()
    const product = new ProductOrderInfo()
    product.id = globalProduct.id
    product.quantity = 4
    order.products.push(product)

    const createdOrder = await ordersService.createNewOrder(user.id, order.products)
    expect(createdOrder).toBeDefined()

    order.id = createdOrder?.id as number
    order.status = 'COMPLETED'
    const result = await ordersService.updateExistingOrder(user.id, order)
    expect(result).toBeDefined()
    expect(result).toBe(true)

    const orders = await ordersService.getCompletedOrders(user.id)
    expect(orders).toBeDefined()
    expect(orders?.length).toBeGreaterThan(0)
  })
})
