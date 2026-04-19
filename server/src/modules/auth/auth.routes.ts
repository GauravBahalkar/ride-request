import express from "express";
import { getProfile, signup } from "./auth.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import { loginSchema, signupSchema } from "./auth.schema.js";
import { login } from "./auth.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many auth attempts, please wait.",
  },
});

router.post("/signup", authLimiter, validate(signupSchema), signup);
router.post("/login", authLimiter, validate(loginSchema), login);
router.get("/me", authenticate, getProfile);

export default router;
