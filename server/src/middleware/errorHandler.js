export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode >= 400 ? res.statusCode : 500;
  
  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal Server Error',
      statusCode,
    },
  });
};
