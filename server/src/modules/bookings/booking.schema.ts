import { z } from "zod";

export const createBookingRequestSchema = z
  .object({
    vehicleId: z.number(),
    startDate: z.string(),
    endDate: z.string(),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export const updateRequestSchema = z.object({
  status: z.enum(["accepted", "rejected"]),
});

export const updateBookingSchema = z.object({
  destination: z.string().optional(),
  paymentStatus: z.enum(["pending", "paid", "failed"]).optional(),
});