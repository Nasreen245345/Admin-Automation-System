/**
 * Consistent success envelope for every endpoint. Pair with AppError
 * subclasses (via errorHandler) for the error envelope, so the frontend
 * can rely on one shape: { success, message, data | details }.
 */
export function sendSuccess(res, { statusCode = 200, message = "Success", data = null, meta = null } = {}) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta ? { meta } : {}),
  });
}
