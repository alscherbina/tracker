import express from 'express';
import path from 'path';
import routes from '../routes';
import * as error from '../middlewares/error';

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

export default app;
