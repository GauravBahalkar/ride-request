import express from "express";
import { upload } from "../../middleware/upload.middleware.js";
import {
  uploadUserDocument,
  uploadVehicleDocument,
} from "./document.controller.js";

import { validate } from "../../middleware/validate.middleware.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";

const router = express.Router();

// user docs
router.post(
  "/user/doc",
  authenticate,
  upload.single("file"),
  uploadUserDocument,
);

// vehicle docs
router.post(
  "/vehicle/doc",
  authenticate,
  requireRole("vendor"),
  upload.single("file"),
  uploadVehicleDocument,
);

export default router;
