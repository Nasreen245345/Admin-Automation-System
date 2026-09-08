import { body, validationResult } from "express-validator";
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

export const registerValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("A valid email is required").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  runValidation,
];

export const loginValidator = [
  body("email").trim().isEmail().withMessage("A valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  runValidation,
];
