import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';

const app = express();
const __dirname = path.resolve();

app.use(cors({
  origin: [/lo/],
  credentials: true,
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});

export default app;
