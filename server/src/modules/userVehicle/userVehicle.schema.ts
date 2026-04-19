import { z } from "zod";

// Profile update
export const updateProfileSchema = z.object({
  name: z.string().min(3).optional(),
  mobileNo: z.string().min(10).optional(),
});

// Vehicle filters
export const vehicleFilterSchema = z.object({
  location: z.string().optional(),
  vehicleType: z.enum(["car", "bike", "van", "bus"]).optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  capacity: z.string().optional(),
});
