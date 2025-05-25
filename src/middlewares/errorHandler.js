export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  const responseBody = {
    status,
    message,
  };

  if (err.errors) {
    responseBody.errors = err.errors;
  }

  res.status(status).json(responseBody);
}
