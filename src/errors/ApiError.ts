/**
 * ApiError with additional properties i.e name and message
 * @type {module.ApiError}
 */
export default class ApiError extends Error {
  constructor(error: any, message: any = null) {
    super();
    this.name = error.name;
    this.message = !message ? error.message : message;
    this.stack = Error().stack;
  }
}
