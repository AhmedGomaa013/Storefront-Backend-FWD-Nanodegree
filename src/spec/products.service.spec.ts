import { Product } from '../models/product'
import { ProductsService } from '../services/product.service'

describe('Products Service Test Cases', () => {
  const productsService = new ProductsService()
  it('should create a new product', async () => {
    const product = new Product()
    product.name = 'TV'
    product.price = 10000

    const returnProduct = await productsService.create(product)
    expect(returnProduct).toBeDefined()
    expect(returnProduct?.id).toBeDefined()
    expect(returnProduct?.name).toBe(product.name)
    expect(returnProduct?.price).toEqual(product.price)
  })

  it('should create and return new product', async () => {
    const product = new Product()
    product.name = 'TV'
    product.price = 10000

    let returnProduct = await productsService.create(product)
    expect(returnProduct).toBeDefined()
    returnProduct = await productsService.show(returnProduct?.id as number)
    expect(returnProduct).toBeDefined()
    expect(returnProduct?.id).toBeDefined()
    expect(returnProduct?.name).toBe(product.name)
    expect(returnProduct?.price).toEqual(product.price)
  })

  it('should create and return list of products', async () => {
    const product = new Product()
    product.name = 'TV'
    product.price = 10000

    const returnProduct = await productsService.create(product)
    expect(returnProduct).toBeDefined()
    const returnProducts = await productsService.index()
    expect(returnProducts).toBeDefined()
    expect(returnProducts?.length).toBeGreaterThan(0)
  })
})
