import { ProductInfo } from '../dtos/product-info'

export class Product {
  id: number
  name: string
  price: number

  validateEntity (): boolean {
    if (this.name == null) {
      return false
    }

    if (this.price == null || isNaN(Number(this.price))) {
      return false
    }

    return true
  }

  static ConvertToProductInfo (source: Product): ProductInfo {
    const result = new ProductInfo()

    result.id = source.id
    result.name = source.name
    result.price = source.price

    return result
  }

  static ConvertFromProductInfo (source: ProductInfo): Product {
    const result = new Product()

    result.id = source.id
    result.name = source.name
    result.price = source.price

    return result
  }

  static ConvertToProductInfoList (source: Product[]): ProductInfo[] {
    const result: ProductInfo[] = []

    source.forEach(element => {
      const val = this.ConvertToProductInfo(element)
      result.push(val)
    })

    return result
  }
};
