import express from "express";
import { getProfile, signup } from "./auth.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import { loginSchema, signupSchema } from "./auth.schema.js";
import { login } from "./auth.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.get("/me", authenticate, getProfile);

export default router;
