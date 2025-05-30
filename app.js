import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import apiRoutes from '#root/routes/index.js';

mongoose.connect('mongodb://localhost/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
app.use((err, req, res, next) => {
  console.error(err.message, err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000);
});
