import { z } from "zod";

export const uploadUserDocumentSchema = z.object({
  documentType: z.enum(["aadhar", "license"]),
  
});

export const uploadVehicleDocumentSchema = z.object({
  vehicleId: z.coerce.number(),
  documentType: z.enum(["rc", "puc", "insurance"]),
 
});
