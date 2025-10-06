export const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || 'Something went wrong on our end';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Invalid data provided';
  }

  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  if (statusCode < 100 || statusCode > 599) {
    statusCode = 500;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
