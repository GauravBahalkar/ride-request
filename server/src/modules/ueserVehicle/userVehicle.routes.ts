import express from "express";
import * as userController from "./userVehicle.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { updateProfileSchema } from "./userVehicle.schema.js";

const router = express.Router();

// Profile
router.get("/profile", authenticate, userController.getProfile);
router.put(
  "/profile",
  authenticate,
  validate(updateProfileSchema),
  userController.updateProfile,
);

// Vehicles
router.get("/vehicles", userController.getVehicles);

export default router;
