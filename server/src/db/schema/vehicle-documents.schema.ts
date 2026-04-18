import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { vehicles } from "./vehicle.schema.js";

export const vehicleDocumentTypeEnum = pgEnum("vehicle_document_type", [
  "rc",
  "puc",
  "insurance",
]);
export const vehicleDocumentStatusEnum = pgEnum("vehicle_document_status", [
  "pending",
  "verified",
  "rejected",
]);

export const vehicleDocuments = pgTable(
  "vehicle_documents",
  {
    id: serial("id").primaryKey(),
    vehicleId: integer("vehicle_id")
      .references(() => vehicles.id)
      .notNull(),

    vehicleDocumentType: vehicleDocumentTypeEnum(
      "vehicle_document_type",
    ).notNull(),
    vehicleDocumentUrl: text("document_url").notNull(), // 🔥 REQUIRED

    vehicleDocumentPublicId: text("document_public_id"), // for cloudinary delete
    vehicleDocumentStatus: vehicleDocumentStatusEnum("vehicle_document_status")
      .default("pending")
      .notNull(),
    rejectionReason: text("rejection_reason"), // 🔥 important
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (table) => ({
    uniqueVehicleDoc: uniqueIndex("unique_vehicle_document").on(
      table.vehicleId,
      table.vehicleDocumentType,
    ),
  }),
);
