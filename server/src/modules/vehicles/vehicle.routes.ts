import { Router } from "express";
import { createVehicle, updateVehicle } from "./vehicle.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { createVehicleSchema, updateVehicleSchema } from "./vehicle.schema.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  getVendorVehicles,
  getVendorVehicleById,
  deleteVehicle,
} from "./vehicle.controller.js";

const router = Router();

// Add vehicle (only logged-in vendor)
router.post(
  "/vehicle",
  authenticate,
  validate(createVehicleSchema),
  createVehicle,
);

// Update vehicle
router.put(
  "/vehicle/:id",
  authenticate,
  validate(updateVehicleSchema),
  updateVehicle,
);

//  Vendor routes
router.get("/my-vehicles", authenticate, getVendorVehicles);

router.get("/my-vehicles/:id", authenticate, getVendorVehicleById);

router.delete("/my-vehicles/:id", authenticate, deleteVehicle);

export default router;
