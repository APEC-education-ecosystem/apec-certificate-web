import { text, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { dbProvider } from "./provider";

export const dbCourse = pgTable("course", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  shortName: varchar("short_name", { length: 20 }).notNull().unique(),
  providerId: text("provider_id")
    .notNull()
    .references(() => dbProvider.id, { onDelete: "cascade" }),
  description: text("description"),
  creator: text("creator").notNull(),
  txHash: text("tx_hash"),
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
});

export type NewCourse = typeof dbCourse.$inferInsert;
