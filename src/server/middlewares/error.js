import httpStatus from 'http-status';
import expressValidation from 'express-validation';
import { APIError } from '../utils/APIError';
import config from '../configs/vars';
import { ModelError } from '../model/errors/ModelError';

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res, next) => {
  const response = {
    code: err.code,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack
  };

  if (config.env !== 'development') {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
const converter = (err, req, res, next) => {
  let convertedError = err;

  if (err instanceof expressValidation.ValidationError) {
    convertedError = new APIError({
      message: 'Validation error',
      errors: err.errors,
      status: err.status,
      stack: err.stack
    });
  } else if (err instanceof ModelError) {
    convertedError = new APIError({
      code: err.code || err.name,
      message: err.message,
      status: httpStatus.BAD_REQUEST,
      stack: err.stack
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status || httpStatus.BAD_REQUEST,
      stack: err.stack
    });
  }

  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
const notFound = (req, res, next) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND
  });
  return handler(err, req, res);
};

export { handler, converter, notFound };
