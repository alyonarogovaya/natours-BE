const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const path = require('path');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const { sanitizeNoSQL, sanitizeStrings } = require('./utils/sanitize');

const app = express();
const ROOT_URL = '/api/v1';
app.locals.mapboxToken = process.env.MAPBOX_TOKEN;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://api.mapbox.com'],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        'https://api.mapbox.com',
        'https://fonts.googleapis.com',
      ],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
      imgSrc: [
        "'self'",
        'data:',
        'blob:',
        'https://*.mapbox.com',
        'https://*.mapbox.cn',
      ],
      connectSrc: [
        "'self'",
        'https://api.mapbox.com',
        'https://*.tiles.mapbox.com',
        'https://events.mapbox.com',
      ],
      workerSrc: ["'self'", 'blob:'],
    },
  }),
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

app.use((req, res, next) => {
  sanitizeNoSQL(req.body);
  sanitizeNoSQL(req.query);
  sanitizeNoSQL(req.params);

  sanitizeStrings(req.body);

  next();
});

app.use('/', viewRouter);
app.use(`${ROOT_URL}/tours`, tourRouter);
app.use(`${ROOT_URL}/users`, userRouter);
app.use(`${ROOT_URL}/reviews`, reviewRouter);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
