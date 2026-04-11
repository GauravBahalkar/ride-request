import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const vehicleTypeEnum = pgEnum("vehicle_type", [
  "car",
  "bike",
  "van",
  "bus",
]);

export const vehicleStatusEnum = pgEnum("vehicle_status", [
  "active",
  "inactive",
]);

export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),

  vehicleName: varchar("vehicle_name", { length: 100 }).notNull(),

  vehicleType: vehicleTypeEnum("vehicle_type").notNull(),

  vehicleCapacity: integer("vehicle_capacity").notNull(),

  pricePerDay: integer("price_per_day").notNull(),

  location: varchar("location", { length: 100 }).notNull(),

  imageUrl: text("image_url").notNull(),

  isAvailable: boolean("is_available").default(true),

  status: vehicleStatusEnum("status").default("active"),

  // JSON-like string
  features: text("features"),

  vendorId: integer("vendor_id").notNull(),

  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at").defaultNow(),
  
});
