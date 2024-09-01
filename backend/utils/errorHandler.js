// backend/utils/errorHandler.js

const errorHandler = (res, error, statusCode = 500) => {
  console.error('Error:', error.message);

  // Check if error is a MongoDB duplicate key error
  if (error.code && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`,
    });
  }

  res.status(statusCode).json({
    success: false,
    message: error.message,
  });
  // throw new Error(error.message || 'Server Error');
};

module.exports = errorHandler;
