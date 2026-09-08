/**
 * Wraps an async route handler so a rejected promise is forwarded to
 * next(err) automatically. Use this on every controller instead of
 * repeating try/catch.
 */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
