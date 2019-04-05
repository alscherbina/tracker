import httpStatus from 'http-status';

class APIError extends Error {
  constructor({ code, message, errors, stack, status = httpStatus.INTERNAL_SERVER_ERROR }) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.stack = stack;
  }
}

export { APIError };
