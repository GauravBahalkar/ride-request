import { Router } from "express";
import { createVehicle, updateVehicle } from "./vehicle.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";
import { createVehicleSchema, updateVehicleSchema } from "./vehicle.schema.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  getVendorVehicles,
  getVendorVehicleById,
  deleteVehicle,
  getVehicleById,
} from "./vehicle.controller.js";

const router = Router();

// Add vehicle (only logged-in vendor)
router.post(
  "/vehicle",
  authenticate,
  requireRole("vendor"),
  validate(createVehicleSchema),
  createVehicle,
);

// Update vehicle
router.put(
  "/vehicle/:id",
  authenticate,
  requireRole("vendor"),
  validate(updateVehicleSchema),
  updateVehicle,
);

// Get vehicle by id
router.get("/vehicle/:id", getVehicleById);

//  Vendor routes
router.get("/my-vehicles", authenticate, requireRole("vendor"), getVendorVehicles);

router.get("/my-vehicles/:id", authenticate, requireRole("vendor"), getVendorVehicleById);

router.delete("/my-vehicles/:id", authenticate, requireRole("vendor"), deleteVehicle);

export default router;
