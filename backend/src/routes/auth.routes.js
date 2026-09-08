import { Router } from "express";
import rateLimit from "express-rate-limit";
import { authController } from "../controllers/authController.js";
import { registerValidator, loginValidator } from "../validators/authValidators.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

// Stricter limit on login specifically to slow down credential stuffing.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts. Please try again later." },
});

router.post("/register", registerValidator, authController.register);
router.post("/login", loginLimiter, loginValidator, authController.login);
router.get("/me", authenticate, authController.me);

export default router;
