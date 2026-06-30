const express = require('express');
const morgan = require('morgan');
const qs = require('qs');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
const ROOT_URL = '/api/v1';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.set('query parser', (str) => qs.parse(str));

app.use(`${ROOT_URL}/tours`, tourRouter);
app.use(`${ROOT_URL}/users`, userRouter);

module.exports = app;
