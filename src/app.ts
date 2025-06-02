import express, { json, urlencoded } from 'express';
import { RegisterRoutes } from '../build/routes';
import { connect } from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../build/swagger.json';

export const app = express();

connect('mongodb://localhost/products');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

//Import API routes, mount all under /api
RegisterRoutes(app);
