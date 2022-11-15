import express, { Request, Response } from 'express'

import { ProductInfo } from '../dtos/product-info'
import { GeneralResponse, GeneralResponseList } from '../dtos/responses/general-responses'
import authorized from '../middlewares/check-jwt'
import { Product } from '../models/product'
import { ProductsService } from '../services/product.service'

const productsService = new ProductsService()
const index = async (req: Request, res: Response): Promise<any> => {
  try {
    const products = await productsService.index()
    if (products == null) {
      return res.status(400).send('Error')
    }
    const productDto = Product.ConvertToProductInfoList(products)

    const response = new GeneralResponseList<ProductInfo>()
    response.data = productDto
    response.count = productDto.length

    res.json(response)
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
    const product = await productsService.show(Number(id))
    if (product == null) {
      return res.status(400).send('Error')
    }
    const productDto = Product.ConvertToProductInfo(product)

    const response = new GeneralResponse<ProductInfo>()
    response.data = productDto

    res.json(response)
  } catch (err) {
    return res.status(400).send('Error')
  }
}

const create = async (req: Request, res: Response): Promise<any> => {
  try {
    const productDto = JSON.parse(JSON.stringify(req.body)) as ProductInfo
    const product = Product.ConvertFromProductInfo(productDto)
    if (!product.validateEntity()) {
      return res.status(400).send('Wrong Values')
    }

    const productReturned = await productsService.create(product)
    if (productReturned == null) {
      return res.status(400).send('Error')
    }

    const response = new GeneralResponse<ProductInfo>()
    response.data = Product.ConvertToProductInfo(productReturned)

    res.json(response)
  } catch (err) {
    console.log(err)
    return res.status(400).send('Error')
  }
}

const productsRoutes = (app: express.Application): any => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', authorized, create)
}

export default productsRoutes
