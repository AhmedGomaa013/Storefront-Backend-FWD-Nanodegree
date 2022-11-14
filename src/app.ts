import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import products_routes from './controllers/products.controller';

const app = express();
dotenv.config();

app.use(bodyParser.json());

const { PORT } = process.env;

products_routes(app);

app.listen(PORT, () => {
  console.log(`Server started on localhost:${PORT}`);
});

export default app;
