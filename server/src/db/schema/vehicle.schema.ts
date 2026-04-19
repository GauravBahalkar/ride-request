import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  text,
  timestamp,
  pgEnum,
  index,
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

  isAvailable: boolean("is_available").notNull().default(true),

  status: text("status").notNull().default("active"),

  // JSON-like string
  features: text("features"),

  imageUrl: text("image_url").notNull().default(""),

  vendorId: integer("vendor_id").notNull(),

  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => {
  return {
    vendorIdIdx: index("vendor_id_idx").on(table.vendorId),
  };
});
