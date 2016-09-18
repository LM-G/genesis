function NotFoundError(code, error) {
  Error.call(this, typeof error === "undefined" ? undefined : error.message);
  Error.captureStackTrace(this, this.constructor);
  this.name = "NotFoundError";
  this.message = typeof error === "undefined" ? undefined : error.message;
  this.code = typeof code === "undefined" ? "404" : code;
  this.status = 404;
  this.inner = error;
}

function UnauthorizedAccessError(code, error) {
  Error.call(this, error.message);
  Error.captureStackTrace(this, this.constructor);
  this.name = "UnauthorizedAccessError";
  this.message = error.message;
  this.code = code;
  this.status = 401;
  this.inner = error;
}

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

UnauthorizedAccessError.prototype = Object.create(Error.prototype);
UnauthorizedAccessError.prototype.constructor = UnauthorizedAccessError;


module.exports = {
  NotFoundError: NotFoundError,
  UnauthorizedAccessError: UnauthorizedAccessError
}