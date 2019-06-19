import express from 'express';
import path from 'path';
import morgan from 'morgan';
import expressSession from 'express-session';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import passport from './passport';
import routes from '../routes';
import * as error from '../middlewares/error';
import log from './logger';

const app = express();

// TODO use general log for requests logging for now, should be separate log in future
app.use(morgan('combined', { stream: log.stream }));

// gzip compression
app.use(compression());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(express.static('public'));
app.use(express.json());

app.use(expressSession({ secret: 'keyboard cat' }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

// if error is not an instance of app error, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only in development mode
app.use(error.handler);

export default app;
