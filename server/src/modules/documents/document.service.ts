import { uploadToCloudinary } from "../../utils/cloudinary.js";
import { db } from "../../index.js";

import { userDocuments } from "../../db/schema/user-documents.schema.js";
import { vehicleDocuments } from "../../db/schema/vehicle-documents.schema.js";

// ==========================
// USER DOCUMENT UPLOAD
// ==========================
export const uploadUserDocumentService = async (
  userId: number,
  documentType: "aadhar" | "license",
  file: Express.Multer.File,
) => {
  const result = await uploadToCloudinary(file, "user-documents");

  const [doc] = await db
    .insert(userDocuments)
    .values({
      userId,
      documentType,
      documentnUrl: result.secure_url,
      status: "pending",
    })
    .returning();

  return { ...doc, url: result.secure_url };
};

// ==========================
// VEHICLE DOCUMENT UPLOAD
// ==========================
export const uploadVehicleDocumentService = async (
  vehicleId: number,
  documentType: "rc" | "puc" | "insurance",
  file: Express.Multer.File,
) => {
  const result = await uploadToCloudinary(file, "vehicle-documents");

  const [doc] = await db
    .insert(vehicleDocuments)
    .values({
      vehicleId,
      vehicleDocumentType: documentType,
      vehicleDocumentUrl: result.secure_url,
      vehicleDocumentPublicId: result.public_id,
      vehicleDocumentStatus: "pending",
    })
    .returning();

  return { ...doc, url: result.secure_url };
};
