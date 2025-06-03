import express, {
  json,
  urlencoded,
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from 'express';
import { RegisterRoutes } from '../build/routes';
import { connect } from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../build/swagger.json';
import { ValidateError } from 'tsoa';

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

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found',
  });
});

const errorHandler = (
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): void => {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }

  next();
};

app.use(errorHandler);
