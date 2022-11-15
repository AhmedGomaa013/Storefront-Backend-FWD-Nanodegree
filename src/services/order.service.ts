import client from '../database'
import { OrderDetails } from '../dtos/order-details'
import { ProductOrderInfo } from '../dtos/product-order-info'

export class OrdersService {
  async getActiveOrders (userId: number): Promise<OrderDetails[] | null> {
    try {
      const conn = await client.connect()
      let sql = 'SELECT * FROM orders WHERE user_id = $1 and status = \'ACTIVE\''
      const result = await conn.query(sql, [userId])

      const orders = result.rows.map(x => {
        const temp = new OrderDetails()
        temp.id = x.id
        temp.status = x.status
        return temp
      })
      const returnOrders: OrderDetails[] = []
      await Promise.all(orders.map(async (order) => {
        sql = `SELECT p.id AS id, p.name AS name, p.price AS price, po.quantity as quantity
             FROM orders AS o
             JOIN products_orders as po 
             on o.id = po.order_id
             JOIN products AS p
             on po.product_id = p.id
             WHERE o.id = $1;`
        const products = await conn.query(sql, [order.id])
        order.products = products.rows
        order.totalPrice = this.calculateOrderTotalPrice(order.products)
        returnOrders.push(order)
      }))
      conn.release()
      return returnOrders
    } catch (err) {
      return null
    }
  }

  async getCompletedOrders (userId: number): Promise<OrderDetails[] | null> {
    try {
      const conn = await client.connect()
      let sql = 'SELECT * FROM orders WHERE user_id = $1 and status = \'COMPLETED\''
      const result = await conn.query(sql, [userId])

      const orders = result.rows.map(x => {
        const temp = new OrderDetails()
        temp.id = x.id
        temp.status = x.status
        return temp
      })
      const returnOrders: OrderDetails[] = []
      await Promise.all(orders.map(async (order) => {
        sql = `SELECT p.id AS id, p.name AS name, p.price AS price, po.quantity as quantity
             FROM orders AS o
             JOIN products_orders as po 
             on o.id = po.order_id
             JOIN products AS p
             on po.product_id = p.id
             WHERE o.id = $1;`
        const products = await conn.query(sql, [order.id])
        order.products = products.rows
        order.totalPrice = this.calculateOrderTotalPrice(order.products)
        returnOrders.push(order)
      }))
      conn.release()
      return returnOrders
    } catch (err) {
      return null
    }
  }

  async createNewOrder (userId: number, products: ProductOrderInfo[]): Promise<OrderDetails | null> {
    try {
      const conn = await client.connect()
      let sql = 'INSERT INTO orders(status, user_id) VALUES($1, $2) RETURNING*;'
      const result = await conn.query(sql, ['ACTIVE', userId])

      const order = new OrderDetails()
      order.id = result.rows[0].id
      order.status = result.rows[0].status

      await Promise.all(products.map(async (product) => {
        sql = `INSERT INTO products_orders(product_id, order_id, quantity)
            VALUES($1, $2, $3) RETURNING*`
        await conn.query(sql, [product.id, order.id, product.quantity])
      }))

      conn.release()
      return order
    } catch (err) {
      return null
    }
  }

  async updateExistingOrder (userId: number, order: OrderDetails): Promise<any | null> {
    try {
      const conn = await client.connect()
      let sql = 'UPDATE orders set status = $1 WHERE id = $2 and user_id = $3 RETURNING*;'
      let result = await conn.query(sql, [order.status, order.id, userId])

      if (result.rows[0] == null) {
        throw new Error('Order Dosn\'t exist')
      }
      sql = 'DELETE FROM products_orders WHERE order_id = $1;'
      result = await conn.query(sql, [order.id])

      await Promise.all(order.products.map(async (product) => {
        sql = `INSERT INTO products_orders(product_id, order_id, quantity)
            VALUES($1, $2, $3) RETURNING*;`
        await conn.query(sql, [product.id, order.id, product.quantity])
      }))

      conn.release()
    } catch (err) {
      return null
    }
  }

  private calculateOrderTotalPrice (products: ProductOrderInfo[]): number {
    let sum = 0
    products.forEach(element => {
      sum += element.price * element.quantity
    })

    return sum
  }
}
