import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import ordersRoutes from './controllers/orders.controller'
import usersRoutes from './controllers/users.controller'
import productsRoutes from './controllers/products.controller'

const app = express()
dotenv.config()

app.use(bodyParser.json())

const { PORT } = process.env

productsRoutes(app)
usersRoutes(app)
ordersRoutes(app)

app.listen(PORT, () => {
  console.log(`Server started on localhost:${PORT as string}`)
})

export default app
