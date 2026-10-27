export const notFound = (req, res, next) => {
  res.status(404).json({
    error: {
      message: `Resource not found: ${req.method} ${req.originalUrl}`,
      statusCode: 404,
    },
  });
};
