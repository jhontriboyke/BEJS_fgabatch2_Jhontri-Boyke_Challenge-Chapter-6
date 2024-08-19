const errorHandler = (err, req, res, next) => {
  // Default
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server Internal Error";
  res.status(statusCode).json({
    status: false,
    message: "fail",
    error: message,
  });
};

module.exports = errorHandler;
