import { verifyToken } from "../utils/jwt.js";
import { userRepository } from "../repositories/userRepository.js";
import { UnauthorizedError } from "../errors/AppError.js";
import { asyncHandler } from "./asyncHandler.js";

/**
 * Verifies the Bearer token and loads the user onto req.user.
 * Every protected route must apply this before requirePermission.
 */
export const authenticate = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    throw new UnauthorizedError("Authentication token missing");
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    throw new UnauthorizedError("Invalid or expired token");
  }

  const user = await userRepository.findById(payload.sub);
  if (!user || !user.isActive) {
    throw new UnauthorizedError("User not found or inactive");
  }

  req.user = user;
  req.userId = user._id.toString();
  next();
});
