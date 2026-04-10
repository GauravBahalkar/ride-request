import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";

export const documentTypeEnum = pgEnum("document_type", ["aadhar", "license"]);
export const statusEnum = pgEnum("status", ["pending", "verified"]);

export const userDocuments = pgTable("user_documents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  documentType: documentTypeEnum("document_type").notNull(),
  documetnUrl: varchar("document_url").notNull(),
  status: statusEnum("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
