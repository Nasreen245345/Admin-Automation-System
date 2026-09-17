import { validationResult } from "express-validator";
import { BadRequestError } from "../errors/AppError.js";

export const runValidation = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    throw new BadRequestError(
      "Validation failed",
      result.array().map((e) => ({ field: e.path, message: e.msg }))
    );
  }
  next();
};

// Clock-in/clock-out act on the authenticated user (req.userId) and take no
// body — these chains exist so the route wiring is consistent with every
// other module, and so future fields (e.g. a location/note) have somewhere
// to be added without touching the route.
export const clockInValidator = [runValidation];

export const clockOutValidator = [runValidation];
