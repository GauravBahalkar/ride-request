import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";
import { vehicles } from "./vehicle.schema.js";

export const bookingStatusEnum = pgEnum("status", [
  "pending",
  "accepted",
  "rejected",
  "expired",
]);

export const bookingRequests = pgTable("booking_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  vendorId: integer("vendor_id").references(() => users.id),
  dateFrom: timestamp("date_from", { mode: "date" }).notNull(),
  dateTo: timestamp("date_to", { mode: "date" }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  expiresAt: timestamp("expires_at").defaultNow(),
});
