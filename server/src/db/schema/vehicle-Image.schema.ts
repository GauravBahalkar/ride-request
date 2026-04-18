import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { vehicles } from "./vehicle.schema.js";

export const vehicleImageTypeEnum = pgEnum("vehicle_image_type", [
  "front",
  "back",
  "side",
  "interior",
  "other",
]);

export const vehicleImages = pgTable("vehicle_images", {
  id: serial("id").primaryKey(),

  vehicleId: integer("vehicle_id")
    .references(() => vehicles.id)
    .notNull(),

  imageUrl: text("image_url").notNull(),

  imagePublicId: text("image_public_id"), // for cloudinary delete

  imageType: vehicleImageTypeEnum("image_type").default("other"),

  createdAt: timestamp("created_at").defaultNow(),
});
