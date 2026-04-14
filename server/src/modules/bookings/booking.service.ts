import { db } from "../../index.js";
import { bookings } from "../../db/schema/bookings.schema.js";
import { vehicles } from "../../db/schema/vehicle.schema.js";
import { users } from "../../db/schema/users.schema.js";
import { bookingRequests } from "../../db/schema/booking-requests.schema.js";

import { eq, and, lt, gt } from "drizzle-orm";

// =========================
//  CREATE BOOKING REQUEST
// =========================
export const createBookingRequestService = async (
  userId: number,
  data: any,
) => {
  const { vehicleId, startDate, endDate } = data;

  if (new Date(startDate) >= new Date(endDate)) {
    throw new Error("Invalid date range");
  }

  const [vehicle] = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, vehicleId));

  if (!vehicle || !vehicle.isAvailable) {
    throw new Error("Vehicle not available");
  }

  // 🔥 conflict check
  const [conflict] = await db
    .select()
    .from(bookingRequests)
    .where(
      and(
        eq(bookingRequests.vehicleId, vehicleId),
        eq(bookingRequests.status, "pending"),
        lt(bookingRequests.dateFrom, new Date(endDate)),
        gt(bookingRequests.dateTo, new Date(startDate)),
      ),
    );

  if (conflict) {
    throw new Error("Vehicle already requested for these dates");
  }

  const [request] = await db
    .insert(bookingRequests)
    .values({
      userId,
      vehicleId,
      vendorId: vehicle.vendorId,
      dateFrom: new Date(startDate),
      dateTo: new Date(endDate),
      status: "pending",
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    })
    .returning();

  return request;
};

// =========================
//  VENDOR ACCEPT / REJECT
// =========================
export const handleBookingRequestService = async (
  requestId: number,
  vendorId: number,
  status: "accepted" | "rejected",
) => {
  const [request] = await db
    .select()
    .from(bookingRequests)
    .where(eq(bookingRequests.id, requestId));

  if (!request || request.vendorId !== vendorId) {
    throw new Error("Unauthorized");
  }

  if (request.status !== "pending") {
    throw new Error("Already processed");
  }

  await db
    .update(bookingRequests)
    .set({ status })
    .where(eq(bookingRequests.id, requestId));

  if (status === "rejected") return { message: "Rejected" };

  const [vehicle] = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, request.vehicleId!));

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  const days =
    (new Date(request.dateTo).getTime() -
      new Date(request.dateFrom).getTime()) /
    (1000 * 60 * 60 * 24);

  const totalPrice = days * vehicle.pricePerDay;

  const [booking] = await db
    .insert(bookings)
    .values({
      userId: request.userId,
      vehicleId: request.vehicleId,
      vendorId: request.vendorId,
      vehicleRequestId: request.id,
      dateFrom: request.dateFrom,
      dateTo: request.dateTo,
      totalPrice: totalPrice.toString(),
      bookingStatus: "confirmed",
      paymentStatus: "paid",
      destination: "To be updated",
    })
    .returning();

  return booking;
};

// =========================
//  GET USER BOOKINGS
// =========================
export const getUserBookingsService = async (userId: number) => {
  return db.select().from(bookings).where(eq(bookings.userId, userId));
};

// =========================
//  GET VENDOR BOOKINGS
// =========================
export const getVendorBookingsService = async (vendorId: number) => {
  return db.select().from(bookings).where(eq(bookings.vendorId, vendorId));
};

// =========================
//  GET BOOKING BY ID
// =========================
export const getBookingByIdService = async (
  bookingId: number,
  userId: number,
) => {
  const [booking] = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, bookingId));

  if (!booking || booking.userId !== userId) {
    throw new Error("Not found");
  }

  return booking;
};

// =========================
//  UPDATE BOOKING
// =========================
export const updateBookingService = async (
  bookingId: number,
  userId: number,
  data: any,
) => {
  const [booking] = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, bookingId));

  if (!booking || booking.userId !== userId) {
    throw new Error("Unauthorized");
  }

  const [updated] = await db
    .update(bookings)
    .set(data)
    .where(eq(bookings.id, bookingId))
    .returning();

  return updated;
};

// =========================
//  CANCEL BOOKING
// =========================
export const cancelBookingService = async (
  bookingId: number,
  userId: number,
) => {
  const [updated] = await db
    .update(bookings)
    .set({ bookingStatus: "cancelled" })
    .where(eq(bookings.id, bookingId))
    .returning();

  return updated;
};

// =========================
// GET ALL REQUESTS (USER)
// =========================
export const getUserRequestsService = async (userId: number) => {
  return db
    .select()
    .from(bookingRequests)
    .where(eq(bookingRequests.userId, userId));
};

// =========================
//  GET VENDOR REQUESTS
// =========================
export const getVendorRequestsService = async (vendorId: number) => {
  return db
    .select()
    .from(bookingRequests)
    .where(eq(bookingRequests.vendorId, vendorId));
};

// =========================
//  GET REQUEST BY ID
// =========================
export const getRequestByIdService = async (id: number) => {
  const [req] = await db
    .select()
    .from(bookingRequests)
    .where(eq(bookingRequests.id, id));

  return req;
};
