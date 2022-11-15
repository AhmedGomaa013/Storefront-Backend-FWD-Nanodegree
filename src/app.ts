import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import products_routes from './controllers/products.controller';
import users_routes from './controllers/users.controller';
import orders_routes from './controllers/orders.controller';

const app = express();
dotenv.config();

app.use(bodyParser.json());

const { PORT } = process.env;

products_routes(app);
users_routes(app);
orders_routes(app);

app.listen(PORT, () => {
  console.log(`Server started on localhost:${PORT}`);
});

export default app;
