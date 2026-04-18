import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";

export const documentTypeEnum = pgEnum("document_type", ["aadhar", "license"]);
export const statusEnum = pgEnum("status", ["pending", "verified", "rejected"]);

export const userDocuments = pgTable(
  "user_documents",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id),
    documentType: documentTypeEnum("document_type").notNull(),
    documentnUrl: text("document_url").notNull(),
    status: statusEnum("status").notNull(),
    rejectionReason: text("rejection_reason"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      uniqueUserDoc: uniqueIndex("unique_user_document").on(
        table.userId,
        table.documentType,
      ),
    };
  },
);
