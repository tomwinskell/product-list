import express, { json, urlencoded } from 'express';
import { RegisterRoutes } from '../build/routes';
import { connect } from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../build/swagger.json';

export const app = express();

connect('mongodb://localhost/products');

app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Import API routes, mount all under /api
RegisterRoutes(app);
