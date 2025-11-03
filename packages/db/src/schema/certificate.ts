import { serial, text, pgTable, timestamp } from "drizzle-orm/pg-core";
import { dbCourse } from "./course";

export const dbCertificate = pgTable("certificate", {
  id: serial("id").primaryKey(),
  wallet: text("wallet").notNull(),
  name: text("name").notNull(),
  nftMint: text("nft_mint").unique(),
  courseId: text("course_id")
    .notNull()
    .references(() => dbCourse.id, { onDelete: "cascade" }),
  creator: text("creator").notNull(),
  txHash: text("tx_hash"),
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
});

export type NewCertificate = typeof dbCertificate.$inferInsert;
