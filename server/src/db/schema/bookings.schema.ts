import {
  decimal,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
  index,
} from "drizzle-orm/pg-core";

import { users } from "./users.schema.js";
import { vehicles } from "./vehicle.schema.js";
import { bookingRequests } from "./booking-requests.schema.js";

export const bookingRequestEnum = pgEnum("booking_request", [
  "pending",
  "confirmed",
  "cancelled",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "paid",
  "failed",
]);

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),

  userId: integer("user_id").references(() => users.id),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  vendorId: integer("vendor_id").references(() => users.id),
  vehicleRequestId: integer("vehicle_request_id").references(
    () => bookingRequests.id,
  ),

  bookingStatus: varchar("booking_status", { length: 30 }).notNull().default("pending"),

  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),

  dateFrom: timestamp("date_from", { mode: "date" }).notNull(),
  dateTo: timestamp("date_to", { mode: "date" }).notNull(),

  destination: varchar("destination", { length: 255 }).notNull(),

  paymentStatus: varchar("payment_status", { length: 30 }).notNull().default("pending"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
}, (table) => {
  return {
    userIdIdx: index("user_id_idx").on(table.userId),
    vehicleIdIdx: index("vehicle_id_idx").on(table.vehicleId),
    statusIdx: index("status_idx").on(table.bookingStatus),
  };
});
