import { AppError } from "../errors/AppError.js";
import { logger } from "../utils/logger.js";
import { isProduction } from "../config/env.js";

/**
 * Catches everything thrown/passed to next(err) in the app. Every route
 * handler should be wrapped in asyncHandler (see middleware/asyncHandler.js)
 * so rejected promises land here instead of crashing the process.
 */
export function errorHandler(err, req, res, _next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let details = err.details || null;

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    details = Object.values(err.errors).map((e) => e.message);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate value";
    details = err.keyValue;
  }

  // Mongoose invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for field: ${err.path}`;
  }

  if (!(err instanceof AppError) && statusCode === 500) {
    logger.error(err.stack || err.message);
  }

  res.status(statusCode).json({
    success: false,
    message,
    details,
    ...(isProduction ? {} : { stack: err.stack }),
  });
}

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}
