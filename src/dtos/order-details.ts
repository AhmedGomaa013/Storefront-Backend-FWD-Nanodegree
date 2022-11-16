import { ProductOrderInfo } from './product-order-info'

export class OrderDetails {
  id: number
  status: string
  totalPrice: number
  products: ProductOrderInfo[] = []
}
