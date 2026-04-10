import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";

export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  vehicleName: varchar("vehicle_name").notNull(),
  vehicleCapacity: integer("vehicle_capacity").notNull(),
  vehicleType: varchar("vehicle_type").notNull(),
  vendorId: integer("vendor_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
