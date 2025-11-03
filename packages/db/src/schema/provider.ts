import { text, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const dbProvider = pgTable("provider", {
  id: text("id").primaryKey(),
  fullName: text("full_name").notNull(),
  shortName: varchar("short_name", { length: 10 }).notNull().unique(),
  description: text("description"),
  country: text("country"),
  address: text("address"),
  creator: text("creator").notNull(),
  txHash: text("tx_hash"),
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
});

export type NewProvider = typeof dbProvider.$inferInsert;
