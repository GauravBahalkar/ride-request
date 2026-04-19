import express from "express";
import {
  createRequest,
  handleRequest,
  getBookings,
  getVendorBookings,
  getBookingById,
  cancelBooking,
  getRequests,
  getVendorRequests,
} from "./booking.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  createBookingRequestSchema,
  updateRequestSchema,
} from "./booking.schema.js";

const router = express.Router();

// =========================
// USER ROUTES
// =========================

// Create booking request
router.post(
  "/request",
  authenticate,
  validate(createBookingRequestSchema),
  createRequest,
);

// Get user bookings
router.get("/", authenticate, getBookings);

// Get user booking by id
router.get("/:id", authenticate, getBookingById);

// Cancel booking
router.patch("/:id/cancel", authenticate, cancelBooking);

// Get user booking requests
router.get("/requests/all", authenticate, getRequests);

// =========================
//VENDOR ROUTES
// =========================

// Get vendor bookings
router.get(
  "/vendor/bookings",
  authenticate,
  requireRole("vendor"),
  getVendorBookings,
);

// Get vendor booking requests
router.get(
  "/vendor/requests",
  authenticate,
  requireRole("vendor"),
  getVendorRequests,
);

// Accept / Reject request
router.patch(
  "/request/:id",
  authenticate,
  requireRole("vendor"),
  validate(updateRequestSchema),
  handleRequest,
);

export default router;
