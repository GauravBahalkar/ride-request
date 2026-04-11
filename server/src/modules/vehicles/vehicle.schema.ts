import { z } from "zod";

const vehicleTypeEnum = z.enum(["car", "bike", "van", "bus", "travels", "scooty"]);

export const createVehicleSchema = z
  .object({
    vehicle_name: z
      .string()
      .trim()
      .min(3, "Vehicle name must be at least 3 characters"),

    vehicle_capacity: z.coerce
      .number()
      .int()
      .min(1, "Capacity must be at least 1")
      .max(20, "Capacity too large"),

    vehicle_type: vehicleTypeEnum,

    vendor_id: z.coerce.number().int("Vendor ID must be an integer"),
  })
  .strict();


  export const updateVehicleSchema =  createVehicleSchema
  .omit({ vendor_id: true })
  .partial();