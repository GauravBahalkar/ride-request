import { z } from "zod";

export const uploadUserDocumentSchema = z.object({
  documentType: z.enum(["aadhar", "license"]),
});

export const uploadVehicleDocumentSchema = z.object({
  vehicleId: z.coerce.number().optional(),
  documentType: z.enum(["rc", "puc", "insurance"]),
});

export const uploadVehicleImageSchema = z.object({
  vehicleId: z.coerce.number().min(1).optional(),
  imageType: z
    .enum(["front", "back", "side", "interior", "other"])
    .optional(),
});
