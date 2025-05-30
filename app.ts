import express, { NextFunction, Request, Response } from 'express';
import { connect } from 'mongoose';
import bodyParser from 'body-parser';
import apiRoutes from '#root/routes/index.js';

connect('mongodb://localhost/products');

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Import API routes, mount all under /api
app.use('/api', apiRoutes);

//Middleware handling errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message, err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000);
});
