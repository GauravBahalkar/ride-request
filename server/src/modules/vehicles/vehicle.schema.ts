import { z } from "zod";

export const createVehicleSchema = z.object({
  vehicleName: z.string().min(3, "Vehicle name is required"),

  vehicleType: z.enum(["car", "bike", "van", "bus"]),

  vehicleCapacity: z
    .number()
    .min(1, "Capacity must be at least 1"),

  pricePerDay: z
    .number()
    .min(1, "Price must be greater than 0"),

  location: z.string().min(2, "Location is required"),

  imageUrl: z.string().url("Invalid image URL"),

  isAvailable: z.boolean().optional(),

  status: z.enum(["active", "inactive"]).optional(),

  features: z.array(z.string()).optional(),
});


  // export const updateVehicleSchema =  createVehicleSchema
  // .omit({ vendor_id: true })
  // .partial();

  

export const updateVehicleSchema = z.object({
  vehicleName: z.string().min(3).optional(),

  vehicleType: z.enum(["car", "bike", "van", "bus"]).optional(),

  vehicleCapacity: z.number().min(1).optional(),

  pricePerDay: z.number().min(1).optional(),

  location: z.string().min(2).optional(),

  imageUrl: z.string().url().optional(),

  isAvailable: z.boolean().optional(),

  status: z.enum(["active", "inactive"]).optional(),

  features: z.array(z.string()).optional(),
});