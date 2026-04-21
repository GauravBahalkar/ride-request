import { uploadToCloudinary } from "../../utils/cloudinary.js";
import { db } from "../../index.js";

import { userDocuments } from "../../db/schema/user-documents.schema.js";
import { vehicleDocuments } from "../../db/schema/vehicle-documents.schema.js";
import { vehicleImages } from "../../db/schema/vehicle-Image.schema.js";
import { vehicles } from "../../db/schema/vehicle.schema.js";
import { eq } from "drizzle-orm";



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
      documentUrl: result.secure_url,
      status: "pending",
    })
    .onConflictDoUpdate({
      target: [userDocuments.userId, userDocuments.documentType],
      set: {
        documentUrl: result.secure_url,
        status: "pending",
        updatedAt: new Date(),
      },
    })
    .returning();

  return { ...doc, url: result.secure_url };
};

export const getUserDocumentsService = async (userId: number) => {
  return await db
    .select()
    .from(userDocuments)
    .where(eq(userDocuments.userId, userId));
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
    .onConflictDoUpdate({
      target: [vehicleDocuments.vehicleId, vehicleDocuments.vehicleDocumentType],
      set: {
        vehicleDocumentUrl: result.secure_url,
        vehicleDocumentPublicId: result.public_id,
        vehicleDocumentStatus: "pending",
        updatedAt: new Date(),
      },
    })
    .returning();

  return { ...doc, url: result.secure_url };
};

// ==========================
// VEHICLE IMAGE UPLOAD
// ==========================
export const uploadVehicleImageService = async (
  vehicleId: number | undefined,
  imageType: "front" | "back" | "side" | "interior" | "other",
  file: Express.Multer.File,
) => {
  const result = await uploadToCloudinary(file, "vehicle-images");

  // If no vehicleId provided (e.g. during vehicle creation), just return the URL
  if (!vehicleId) {
    return { imageUrl: result.secure_url, imagePublicId: result.public_id };
  }

  const [image] = await db
    .insert(vehicleImages)
    .values({
      vehicleId,
      imageUrl: result.secure_url,
      imagePublicId: result.public_id,
      imageType: imageType || "other",
    })
    .returning();

  // ✅ Update the main vehicle table if this is a 'front' image (main profile image)
  if (imageType === "front" || !imageType) {
    await db
      .update(vehicles)
      .set({ imageUrl: result.secure_url })
      .where(eq(vehicles.id, vehicleId));
  }

  return image;
};


