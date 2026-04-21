import express from "express";
import { upload } from "../../middleware/upload.middleware.js";
import {
  uploadUserDocument,
  uploadVehicleDocument,
  uploadVehicleImage,
  getUserDocuments,
} from "./document.controller.js";

import { validate } from "../../middleware/validate.middleware.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { requireRole } from "../../middleware/role.middleware.js";
import {
  uploadUserDocumentSchema,
  uploadVehicleDocumentSchema,
  uploadVehicleImageSchema,
} from "./document.schema.js";

const router = express.Router();

// user docs
router.get("/user/me", authenticate, getUserDocuments);

router.post(
  "/user/doc",
  authenticate,
  upload.single("file"),
  validate(uploadUserDocumentSchema),
  uploadUserDocument,
);

// vehicle docs
router.post(
  "/vehicle/doc",
  authenticate,
  requireRole("vendor"),
  upload.single("file"),
  validate(uploadVehicleDocumentSchema),
  uploadVehicleDocument,
);

// vehicle images
router.post(
  "/vehicle/image",
  authenticate,
  requireRole("vendor"),
  upload.single("file"),
  validate(uploadVehicleImageSchema),
  uploadVehicleImage,
);

export default router;
