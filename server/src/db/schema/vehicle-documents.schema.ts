import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { vehicles } from "./vehicle.schema.js";
import { users } from "./users.schema.js";

export const vehicleDocumentTypeEnum = pgEnum("vehicle_document_type", [
  "rc",
  "puc",
  "insurance",
]);
export const vehicleStatusEnum = pgEnum("vehicle_status", [
  "pending",
  "verified",
]);

export const vehicleDocuments = pgTable("vehicle_documetns", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  vendorId: integer("vendor_id").references(() => users.id),
  vehicleDocumentType: vehicleDocumentTypeEnum(
    "vehicle_document_type",
  ).notNull(),
  vehicleStatus: vehicleStatusEnum("vehicle_status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
