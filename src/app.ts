import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.json());

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server started on localhost:${PORT}`);
});

export default app;
