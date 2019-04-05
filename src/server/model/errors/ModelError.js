class ModelError extends Error {
  constructor({ code, message, stack }) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.message = message;
    this.stack = stack;
  }
}

export { ModelError };
